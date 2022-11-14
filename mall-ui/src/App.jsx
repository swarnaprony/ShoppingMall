import React, {useState, useEffect} from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login/Login";
import Home from "./components/Home";
import Register from "./components/Login/Register"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {

    return (  
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element ={<><Navbar clicked={"login"} /><Login /></>} />
            <Route path="/register" element={<><Navbar clicked={"register"} /><Register /></>} />
          </Routes>
        </Router>

      </div>       
    )
}

export default App;