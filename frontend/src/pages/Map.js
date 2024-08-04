<<<<<<< HEAD
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
=======
// src/pages/Maps.js
import React from 'react';
import mapImg from "../images/map.jpg";

const Maps = () => {
  return (
    <div className='flex flex-col justify-center items-center mb-14'>
      <div className='flex justify-center items-center bg-green-50 px-2 py-1 mb-2 rounded-lg shadow-lg '>
      <h1 className=' font-semibold '>displaying accessible locations near you via markers on map</h1>
      </div>
      <img src={mapImg} alt="Map" className='rounded-md h-[780px] w-[1190px]  shadow-lg' />
    </div>
  );
};

export default Maps;
>>>>>>> origin/main
