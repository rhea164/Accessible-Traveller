// src/pages/Search.js
import React, { useState } from 'react';
const search = '../public/search.png';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    
    // Heading 
    <div className="flex h-full justify-center items-center flex-col">
      <div className="flex flex-col items-center justify-center p-14 gap-y-10">
        <h1 className="text-6xl">Hi, where would you like to go?</h1>
        <h4 className="text-2xl">Tell us your preferences</h4>
      </div>

      {/* Search Bar */}
      <div className="flex border-4 w-2/3 p-3 rounded-lg">
        <div className="flex flex-row w-full">
          <input
            className="w-4/5 p-2 focus:outline-none"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for a place..."
          />
          <button className="w-1/5 justify-center flex flex-row bg-blue-500 
                            hover:bg-blue-700 transition duration-300 ease-in-out
                            text-white font-bold py-2 px-4 rounded align-left">
            <image src={search} />
            Search 
          </button>
        </div>
      </div>

      {/* Select Accessibility Features */}
      <div className="flex flex-col mt-10">
        <h4 className="text-xl">Select Common Accessibility Features</h4>
        <div className="flex flex-row p-3">

        </div>
      </div>

      <button className="bg-white text-blue-500 border border-blue-500 font-bold py-2 px-4 rounded
                   hover:bg-blue-700 hover:text-white
                   transition duration-300 ease-in-out">
        Browse our options
      </button>
    </div>
  );
}

export default Search;