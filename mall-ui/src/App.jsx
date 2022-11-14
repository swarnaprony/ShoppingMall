import React, {useState, useEffect} from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/LoginComponents/Login";
import Home from "./components/Home";
import Register from "./components/LoginComponents/Register"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {

    return (  
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>

      </div>       
    )
}

export default App;