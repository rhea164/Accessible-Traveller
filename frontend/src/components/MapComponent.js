import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
const GOOGLE_PLACES_API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY; // Access from .env


const Maps = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [sidebarData, setSidebarData] = useState(null);

  useEffect(() => {
    if (window.google) {
      const initialMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 }, // Default center
        zoom: 10,
      });
      setMap(initialMap);

      // Example markers
      const locations = [
        { lat: 37.7749, lng: -122.4194, id: 'ChIJN1t_tDeuEmsRUsoyG83frY4' }, // Example Place ID
        { lat: 37.7849, lng: -122.4294, id: 'ChIJ7cv00DwsDogRAMDACa2m4K8' }  // Example Place ID
      ];

      locations.forEach(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: initialMap,
          title: 'Click for details'
        });

        marker.addListener('click', () => {
          handleMarkerClick(location);
        });
      });
    }
  }, []);

  const handleMarkerClick = async (location) => {
    setSelectedLocation(location);

    // Fetch data from Google Places API
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
        params: {
          place_id: location.id,
          key: GOOGLE_PLACES_API_KEY,
        }
      });
      const placeDetails = response.data.result;

      // Fetch additional data from your backend
      const locationResponse = await axios.get(`/locations/${location.id}`);
      const additionalData = locationResponse.data;

      setSidebarData({
        ...placeDetails,
        ...additionalData
      });
    } catch (error) {
      console.error('Error fetching location details:', error);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        ref={mapRef}
        style={{
          flex: 1,
          height: '100%',
          transition: 'flex 0.3s ease',
          marginRight: sidebarData ? '300px' : '0', // Adjust map size when sidebar is shown
        }}
      ></div>
      {sidebarData && (
        <div
          style={{
            width: '300px',
            padding: '20px',
            borderLeft: '1px solid #ddd',
            backgroundColor: '#fff',
            height: '100%',
            overflowY: 'auto',
            transition: 'width 0.3s ease',
          }}
        >
          <h2>{sidebarData.name}</h2>
          <p><strong>Address:</strong> {sidebarData.formatted_address}</p>
          <p><strong>Rating:</strong> {sidebarData.rating}</p>
          <p><strong>User Ratings:</strong> {sidebarData.user_ratings_total}</p>
          {sidebarData.photos && sidebarData.photos.length > 0 && (
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${sidebarData.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`}
              alt={sidebarData.name}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
          <a href={`https://www.google.com/maps/place/?q=place_id:${selectedLocation.id}`} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
        </div>
      )}
    </div>
  );
};

export default Maps;
