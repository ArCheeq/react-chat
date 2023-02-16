import React from 'react';
import Register from './app/Pages/Register/Register';
import Login from './app/Pages/Login/Login';
import Home from './app/Pages/Home/Home';

import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/sign-in' element={<Login/>}/>
        <Route path='sign-up' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
