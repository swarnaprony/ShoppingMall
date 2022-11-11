import React from "react";

function Login() {
    return (
        <form className="form">
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="E-Mail" />
            <input type="password" placeholder="Password" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Login;