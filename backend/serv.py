import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import Flask, jsonify
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from bson import json_util
import json
import requests
from bson import json_util, ObjectId
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)
uri = os.getenv('MONGO_URI')
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["Cluster0"]

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

GOOGLE_PLACES_API_KEY = os.getenv('GOOGLE_PLACES_API_KEY')

@app.route('/search', methods=['GET'])
def search_places():
    query = request.args.get('query')
    
    url = "https://places.googleapis.com/v1/places:searchText"
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.photos,places.rating,places.userRatingCount"
    }
    data = {
        "textQuery": query
    }
    
    response = requests.post(url, json=data, headers=headers)
    places_data = response.json()
    
    results = []
    for place in places_data.get('places', []):
        photo_url = None
        if place.get('photos'):
            photo_reference = place['photos'][0]['name']
            photo_url = f"https://places.googleapis.com/v1/{photo_reference}/media?key={GOOGLE_PLACES_API_KEY}&maxHeightPx=400&maxWidthPx=400"
        
        results.append({
            'name': place['displayName']['text'],
            'address': place.get('formattedAddress', 'Address not available'),
            'rating': place.get('rating', 'Not rated'),
            'user_ratings_total': place.get('userRatingCount', 0),
            'photo_url': photo_url
        })
    
    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
    