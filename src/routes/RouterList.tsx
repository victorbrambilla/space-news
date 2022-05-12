import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import SingleNews from '../pages/SingleNews';

export default function RouterList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='news/:id' element={<SingleNews />} />
      </Routes>
    </BrowserRouter>
  );
}
