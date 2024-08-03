// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

const Header = () => {
  return (
    <header className="flex flex-row w-full justify-center items-center bg-white text-black py-10">
      <nav className="flex justify-around">
        <Link to="/" className="hover:text-gray-300 mx-6
                                transition duration-300 ease-in-out">
                                    Home
        </Link>
        <Link to="/search" className="hover:text-gray-300 mx-6
                                    transition duration-300 ease-in-out">
                                        Search
        </Link>
        <Link to="/map" className="hover:text-gray-300 mx-6
                                    transition duration-300 ease-in-out">
            Map
        </Link>
      </nav>
    </header>
  );
};

export default Header;
