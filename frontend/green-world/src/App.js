import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';

// Imports for components and pages
import Login from './pages/Login/login'

function App() {



  return (
    <>
      <header>
        <h1>This is my header</h1>
      </header>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
