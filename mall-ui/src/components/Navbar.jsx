import React from 'react';
import { Link} from 'react-router-dom';

function Navbar(){
    return (
        <div>
            <div className="navbar gradient-custom">
                <Link style={{ color: 'Blue'}} to="/">Home</Link>
                <Link style={{ color: 'Blue'}} to="/login">Login</Link>
                <Link style={{ color: 'Blue'}} to="/register">Register</Link>
            </div>
        </div>
    )
}


export default Navbar;