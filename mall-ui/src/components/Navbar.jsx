import React from 'react';
import { Link} from 'react-router-dom';

function Navbar(){
    return (
        <div>
            <div className="navbar gradient-custom">
                <ul>
                    <li>
                        <Link style={{ color: 'Blue'}} to="/">Home</Link>
                    </li>
                    <li>
                        <Link style={{ color: 'Blue'}} to="/login">Login</Link>
                    </li>
                    <li>
                        <Link style={{ color: 'Blue'}} to="/register">Register</Link>
                    </li>
                </ul>
                
                
                
            </div>
        </div>
    )
}


export default Navbar;