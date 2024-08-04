import requests
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import Flask, jsonify
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from bson import json_util
import json
from bson import json_util, ObjectId
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)
uri = os.getenv('MONGO_URI')
client = MongoClient(uri, server_api=ServerApi('1'), tlsAllowInvalidCertificates=True)
db = client["Cluster0"]

GOOGLE_PLACES_API_KEY = os.getenv('GOOGLE_PLACES_API_KEY')


if "user_contributions" not in db.list_collection_names():
    db.create_collection("user_contributions")

def parse_json(data):
    return json.loads(json_util.dumps(data))

@app.route('/ratings', methods=['GET'])
def get_all_rewards():
    rewards = db.ratings.find()
    return jsonify(parse_json(rewards)), 200

@app.route('/locations', methods=['POST'])
def add_location():
    location_data = request.json
    required_fields = ["location_id", "name", "address", "latitude", "longitude", "accessibility_info", "proof_images"]
    for field in required_fields:
        if field not in location_data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    if "ratings" not in location_data:
        location_data["ratings"] = []
    
    result = db.locations.insert_one(location_data)
    inserted_location = db.locations.find_one({"_id": result.inserted_id})
    return jsonify(parse_json(inserted_location)), 201

@app.route('/locations/<location_id>/add_rating', methods=['POST'])
def add_rating(location_id):
    rating_data = request.json
    
    if "rating" not in rating_data or "comment" not in rating_data:
        return jsonify({"error": "Rating and comment are required"}), 400
    
    new_rating = {
        "rating_id": str(ObjectId()),  
        "rating": rating_data["rating"],
        "comment": rating_data["comment"]
    }
    
    result = db.locations.update_one(
        {"location_id": location_id},
        {"$push": {"ratings": new_rating}}
    )
    
    if result.modified_count == 0:
        return jsonify({"error": "Location not found"}), 404
    
    updated_location = db.locations.find_one({"location_id": location_id})
    return jsonify(parse_json(updated_location)), 200


@app.route('/locations/<location_id>/ratings', methods=['GET'])
def get_location_ratings(location_id):
    location = db.locations.find_one({"location_id": location_id})
    if not location:
        return jsonify({"error": "Location not found"}), 404
    
    ratings = location.get('ratings', [])
    return jsonify(parse_json(ratings)), 200



@app.route('/search', methods=['GET'])
def search_places():
    query = request.args.get('query')

    accessibility_features = request.args.getlist('features')
    print(f"Received query: {query}")
    print(f"Received accessibility features: {accessibility_features}")
    url = "https://places.googleapis.com/v1/places:searchText"
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.photos,places.rating,places.userRatingCount"
    }
    data = {
        "textQuery": query
    }
    
    response = requests.post(url, json=data, headers=headers)
    places_data = response.json()
    print(f"Google Places API response status code: {response.status_code}")
    print(f"Google Places API response content: {response.text}")
    print(f"Parsed places data: {places_data}")
    print(f"Number of places received: {len(places_data.get('places', []))}")
    results = []
    for place in places_data.get('places', []):
        photo_url = None
        if place.get('photos'):
            photo_reference = place['photos'][0]['name']
            photo_url = f"https://places.googleapis.com/v1/{photo_reference}/media?key={GOOGLE_PLACES_API_KEY}&maxHeightPx=400&maxWidthPx=400"
        
        place_id = place['id']
        db_location = db.locations.find_one({"location_id": place_id})
        
        accessibility_info = {}
        ratings = []
        if db_location:
            accessibility_info = db_location.get('accessibility_info', {})
            ratings = db_location.get('ratings', [])
        
        place_data = {
            'place_id': place_id,
            'name': place['displayName']['text'],
            'address': place.get('formattedAddress', 'Address not available'),
            'rating': place.get('rating', 'Not rated'),
            'user_ratings_total': place.get('userRatingCount', 0),
            'photo_url': photo_url,
            'accessibility_info': accessibility_info,
            'ratings': ratings
        }
        print(f"Place ID: {place_id}")
        print(f"DB location: {db_location}")
        print(f"Accessibility info: {accessibility_info}")
        print(f"Requested features: {accessibility_features}")
        # Filter based on accessibility features
        if not accessibility_features or (accessibility_features and all(feature in accessibility_info.get('features', []) for feature in accessibility_features)):
            print("Place added to results")
            results.append(place_data)
        else:
            print("Place filtered out")
    print(results)
    return jsonify(results)

@app.route('/locations/<location_id>/accessibility', methods=['GET'])
def get_location_accessibility(location_id):
    location = db.locations.find_one({"location_id": location_id})
    if not location:
        return jsonify({"error": "Location not found"}), 404
    
    accessibility_info = location.get('accessibility_info', {})
    return jsonify(accessibility_info), 200

@app.route('/locations/<location_id>/contribute', methods=['POST'])
def contribute_location_info(location_id):
    contribution_data = request.json
    
    # Update location information
    db.locations.update_one(
        {"location_id": location_id},
        {"$set": {
            "accessibility_info": contribution_data.get('accessibility_info', {}),
        },
         "$push": {
             "ratings": {
                 "rating_id": str(ObjectId()),
                 "rating": contribution_data.get('rating'),
                 "comment": contribution_data.get('comment')
             }
         }
        },
        upsert=True
    )
    
    # Add to UserContributions collection
    contribution_data['location_id'] = location_id
    contribution_data['contribution_id'] = str(ObjectId())
    db.user_contributions.insert_one(contribution_data)
    
    return jsonify({"message": "Contribution added successfully"}), 200

@app.route('/locations/<location_id>/contributions', methods=['GET'])
def get_location_contributions(location_id):
    contributions = db.user_contributions.find({"location_id": location_id})
    return jsonify(parse_json(list(contributions))), 200



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)






