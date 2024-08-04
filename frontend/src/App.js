// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Maps from './pages/Map';
import './App.css';

const App = () => {
  return (
    <div className="bg-image-container">
      <div className="w-full">
        <Header />
      </div>
      <div className="w-full">
        <main className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/maps" element={<Maps />} />
            </Routes>
          </main>
      </div>
      </div>
  );
};

export default App;
