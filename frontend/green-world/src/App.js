import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';

// Imports for components and pages
import Home from './pages/Home/home'
import Signup from './pages/Signup/signup'
import Login from './pages/Login/login'
import Nav from './components/Nav/nav'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state variable for login status


  return (
    <>
      <header>
        <Nav isLoggedIn={isLoggedIn} /> {/* only render Nav when isLoggedIn is true */}
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* pass handleLogin function as prop to Login component */}
        <Route path='/signup' element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </>
  );
}

export default App;
