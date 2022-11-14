import React, {useState, useEffect} from "react";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register"
import {Route, Routes, Link, Outlet} from "react-router-dom";

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />}/>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Route>                
            </Routes>                        
        </div>            
    )
}

function Layout() {
    return (
      <div>
        {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
  
        <hr />

        <Outlet />

        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            
          </ul>
        </nav>
  
      </div>
    );
  }

export default App;