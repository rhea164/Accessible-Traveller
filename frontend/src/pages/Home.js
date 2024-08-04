// src/pages/Home.js
import React from 'react';
import AboutUs from '../components/AboutUs';

const Home = () => {
  return (
    <div className="mx-32 mb-12">
      <div className="flex md:flex-col flex-row">
        <AboutUs />
      </div>
    </div>
  );
};

export default Home;
