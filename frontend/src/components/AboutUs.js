// src/components/AboutUs.js
import React from 'react';
import '../index.css'

const logo='/about_us_image.jpg';
const Priyadarshan = '/Priyadarshan.png';
const Rhea = '/rhea.png';
const Elif = '/elif.png';
const Bratee = '/bratee.png';
const card = '/card.png';

const AboutUs = () => {
    const teammates = [
        {
          name: 'Priyadarshan Narayanasamy',
          school: 'University of Maryland',
          image: Priyadarshan,
          hobbies: ['AI Research'],
          funFact: 'Empowering underprivileged children through education'
        },
        {
          name: 'Rhea Menezes',
          school: 'Herriot-Watt University',
          image: Rhea,
          hobbies: ['Painting', 'Dancing', 'Traveling'],
          funFact: 'I have been to 10 countries.'
        },
        {
          name: 'Elif Candan',
          school: 'Bilkent University',
          image: Elif,
          hobbies: [ 'video games', 'cosplay', 'baking'],
          funFact: "i love listening to marina's songs when i work :)"
        },
        {
          name: 'Bratee Podder',
          school: 'Georgia Institute of Technology',
          image: Bratee,
          hobbies: ['Coding', 'Gaming', 'Cycling'],
          funFact: 'I built my first app at age 10.'
        }
      ];

  return (
    <div className="lg:grid grid-cols-3 gap-10 grid-rows-2 flex flex-col">

        <div className="flex flex-col justify-center items-center bg-off-white col-span-2 row-span-1 p-7 shadow-xl rounded-lg">

            <h1 className="text-3xl mb-5 font-bold">About Us</h1>

            <div className="flex md:flex-row flex-col items-center justify-center">

                <p className="mr-8">
                    Our app is dedicated to making the world more accessible for everyone. 
                    Through your contributions, we can record accessibility information about places.
                    <br /><br />
                    Whether you're looking to plan an accessible 
                    route, find out if a location is wheelchair-friendly, or read comments from other users, 
                    our app provides valuable insights to ensure inclusivity and convenience. 
                    Join our community in creating a more accessible world, one map at a time.
                    We are committed to making the world more accessible for everyone, and your feedback is invaluable in achieving this goal. 
                    Stay tuned for more features and updates as we continue to develop and improve our platform.
                    <br></br>
                    <br></br>
                    Thank you for being a part of our journey towards inclusivity and accessibility!
                </p>

                <img src={logo} alt="logo" className="rounded-lg h-[250px] shadow-lg" />

            </div>

        </div>

        <div className="flex flex-col justify-center items-center bg-off-white row-span-2 p-7 shadow-xl rounded-lg">

            <h1 className="text-3xl mb-5 font-bold">Our Creators</h1>

                <div className="flex flex-col justify-center items-center gap-y-5 w-full">
                    {teammates.map((teammate, index) => (
                        <div 
                        key={index} 
                        className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 
                        items-center gap-y-2 gap-x-5 rounded-lg 
                        text-black p-5 w-full md:w-auto shadow-sm border-4"
                        >
                        <img 
                            src={teammate.image} 
                            alt={teammate.name} 
                            className="rounded-lg h-[100px] shadow-lg mb-3 md:mb-0 col-span-1 row-span-1" 
                        />
                        <div className="col-span-1 row-span-1 flex flex-col items-center md:items-start">
                            <p className="font-bold text-md">{teammate.name}</p>
                            <p className="text-xs">{teammate.school}</p>
                        </div>
                        <div className="flex flex-col items-center md:items-start col-span-2 row-span-1">
                            <p className="text-center md:text-left text-sm mb-1">Hobbies: {teammate.hobbies.join(', ')}</p>
                            <p className="text-center md:text-left text-sm">Fun Fact: {teammate.funFact}</p>
                        </div>
                        </div>
                    ))}
                </div>

        </div>

        <div className="flex flex-col justify-center items-center bg-off-white p-7 shadow-xl rounded-lg col-span-2 row-span-1">
                <h1 className="text-3xl mb-5 font-bold">How we work</h1>
                <div className="flex md:flex-row flex-col items-center justify-center">

                <p className="mr-8">
                    In our search page, you can search for a place using the search bar. 
                    <br></br>
                    <br></br>
                    You can also select accessibility features from the dropdown menu.
                    <br></br>
                    <br></br>
                    Once you search up your place, you can click on any card displaying a place to view detailed information, such as 
                    comments left by others, ratings, and other accessibility features users believe the place had.
                    <br></br>
                    <br></br>
                    Additionally, you can filter your search results based on various criteria to find exactly what you're looking for. 
                    Whether it's wheelchair accessibility, braille signage, or other specific requirements, our platform aims to provide 
                    comprehensive information to cater to diverse needs.
                </p>

                <img src={card} alt="card display" className="rounded-lg h-[250px] shadow-lg" />

            </div>
        </div>

    </div>
  );
};

export default AboutUs;
