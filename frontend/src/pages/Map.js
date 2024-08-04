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
