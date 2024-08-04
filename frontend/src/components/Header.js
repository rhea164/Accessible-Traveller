// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
const logo = '/logo.png';

const Header = () => {
  return (
    <div className='flex justify-center mx-32 my-12 items-center'>
      <header className="flex flex-row w-full border-4 border-off-white bg-off-white text-black py-3 rounded-lg shadow-lg items-center">
        <div className="flex justify-center w-full">
          <img src={logo} alt="logo" className="mx-5 h-10 align-left" />

          <nav className="flex justify-center ">
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
