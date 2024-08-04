import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const MapComponent = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([
    { lat: 37.7749, lng: -122.4194, title: 'Marker 1' }, // Example marker 1
    { lat: 37.7849, lng: -122.4294, title: 'Marker 2' }  // Example marker 2
  ]);

  // Access the API key from environment variables
  const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  useEffect(() => {
    // Initialize the map after the component mounts
    if (window.google) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng = { lat: latitude, lng: longitude };
          
          const initialMap = new window.google.maps.Map(mapRef.current, {
            center: userLatLng,
            zoom: 12,
          });
          setMap(initialMap);

          // Place markers on the map
          markers.forEach((marker) => {
            new window.google.maps.Marker({
              position: { lat: marker.lat, lng: marker.lng },
              map: initialMap,
              title: marker.title,
            });
          });
          
          // Set user location
          setUserLocation(userLatLng);
        }, () => {
          console.error('Error getting user location.');
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div
        ref={mapRef}
        style={{ height: '100%', width: '100%' }}
      ></div>
    </div>
  );
};

export default MapComponent;
