// src/pages/Home.js
import React from 'react';
import AboutUs from '../components/AboutUs';

const Home = () => {
  return (
    <div className="mx-5 mb-12 md:mx-32">
      <div className="flex md:flex-col flex-row">
        <AboutUs />
      </div>
    </div>
  );
};

export default Home;
