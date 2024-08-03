// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Map from './pages/Map';

const App = () => {
  return (
    <div>
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
