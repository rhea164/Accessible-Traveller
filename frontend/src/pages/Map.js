// MapComponent.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '80%',
  height: '80%'
};

const center = {
  lat: 0,
  lng: 0
};

const markers = [
  { lat: 37.7749, lng: -122.4194, title: "Marker 1" },
  { lat: 37.7849, lng: -122.4294, title: "Marker 2" }
];

function MapComponent() {
  const [map, setMap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
  });

  const [userLocation, setUserLocation] = useState(center);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
    mapInstance.setCenter(userLocation);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation}
      zoom={12}
      onLoad={handleMapLoad}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          title={marker.title}
        />
      ))}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
}

export default MapComponent;
