import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';

// Imports for components and pages
import Home from './pages/Home/home'
import Signup from './pages/Signup/signup'
import Login from './pages/Login/login'

function App() {



  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
