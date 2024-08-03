import requests
import json

BASE_URL = 'http://localhost:8000'

def test_add_location_and_ratings():
    new_location = {
        "location_id": "test123",
        "name": "Test Location",
        "address": "123 Test St, Test City, Test Country",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "accessibility_info": {
            "brightness_levels": "moderate",
            "noise_levels": "low",
            "accessible_toilets": "yes",
            "accessible_entrances": "yes",
            "ramps": "available",
            "extra_descriptions": "Braille signage available"
        },
        "proof_images": {
            "ramps": "http://example.com/ramp.jpg",
            "accessible_entrances": "http://example.com/entrance.jpg",
            "accessible_toilets": "http://example.com/toilet.jpg"
        }
    }

    response = requests.post(f'{BASE_URL}/locations', json=new_location)
    print("Add Location Response:", response.status_code)
    print(json.dumps(response.json(), indent=2))
    
    assert response.status_code == 201, "Failed to add location"
    
    location_id = new_location['location_id']

    new_rating = {
        "rating": 4,
        "comment": "Great accessibility features!"
    }
    response = requests.post(f'{BASE_URL}/locations/{location_id}/ratings', json=new_rating)
    print("\nAdd Rating Response:", response.status_code)
    print(json.dumps(response.json(), indent=2))
    assert response.status_code == 200, "Failed to add rating"
    response = requests.get(f'{BASE_URL}/locations/{location_id}/ratings')
    print("\nGet Ratings Response:", response.status_code)
    print(json.dumps(response.json(), indent=2))
    
    assert response.status_code == 200, "Failed to get ratings"
    assert len(response.json()) > 0, "No ratings returned"

    print("\nAll tests passed successfully!")

if __name__ == "__main__":
    test_add_location_and_ratings()