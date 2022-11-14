import React from "react";

function Login() {
    return (
        <div>
            <form className="form">
                <input type="text" name="username" placeholder="Username" />
                <input type="email" name="email" placeholder="E-Mail" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;