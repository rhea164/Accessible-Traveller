// src/components/AboutUs.js
import React from 'react';
import '../index.css'

const logo='/about_us_image.jpg';

const AboutUs = () => {
  return (
    <div className="flex flex-col jusfity-center items-center bg-off-white w-2/3 p-7 shadow-xl rounded-lg ">
        <h1 className="text-3xl mb-5 font-bold ">About Us</h1>

        <div className="flex flex-row items-center justify-center">
            <p className="mr-8">
                Welcome to Accessible Mapper!
                <br /><br />
                Our app is dedicated to making the world more accessible for everyone. 
                Through your contributions, we can record accessibility information about places.
                <br /><br />
                Whether you're looking to plan an accessible 
                route, find out if a location is wheelchair-friendly, or read comments from other users, 
                our app provides valuable insights to ensure inclusivity and convenience. 
                Join our community in creating a more accessible world, one map at a time.
                </p>

            <img src={logo} alt="logo" className="rounded-lg h-[250px] shadow-lg " />
        </div>
    </div>
  );
};

export default AboutUs;
