import React from "react";
import Footer from "../Footer";

function Register() {
    return (
        <div>
            <form className="form">                   
                <ul>
                    <input type="text" name="username" placeholder="Username" />
                </ul>
                <ul>
                    <input type="email" name="email" placeholder="E-Mail" />
                </ul>
                <ul>
                    <input type="password" name="password" placeholder="Password" />
                </ul>
                <ul>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" />
                </ul>
                <ul>
                    <button type="submit">Submit</button>
                </ul>
            </form>
            <Footer />
        </div>
    )
}

export default Register;
