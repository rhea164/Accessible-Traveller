// src/pages/Map.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        () => {
          // Handle error
          setCenter({ lat: 37.7749, lng: -122.4194 }); // Default location
        }
      );
    } else {
      // Handle error
      setCenter({ lat: 37.7749, lng: -122.4194 }); // Default location
    }
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAmRgSUqa5241utfKT7oz5pA758S8DEAcA"
    >
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ height: '100vh', width: '100%' }}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
