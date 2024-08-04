// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
const logo = '/logo.png';

const Header = () => {
  return (
    <div className='flex justify-center items-center mx-5 my-12 md:mx-32'>
      <header className="flex w-full bg-off-white text-black py-3 rounded-lg shadow-lg items-center justify-center">
        <div className="flex justify-center items-center md:w-full">
          <img src={logo} alt="logo" className="mx-5 h-10 align-left hidden md:block" />

          <nav className="flex justify-center">
            <Link to="/" className="hover:bg-lime-950 hover:text-white mx-6 py-2 px-4 rounded-lg transition duration-300 ease-in-out">
              Home
            </Link>

            <Link to="/search" className="hover:bg-lime-950 hover:text-white mx-6 py-2 px-4 rounded-lg transition duration-300 ease-in-out">
              Search
            </Link>

            <Link to="/map" className="hover:bg-lime-950 hover:text-white mx-6 py-2 px-4 rounded-lg transition duration-300 ease-in-out">
              Map
            </Link>
          </nav>
        </div>

      </header>
    </div>

  );
};

export default Header;
