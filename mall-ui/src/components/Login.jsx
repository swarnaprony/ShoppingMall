import React from "react";

function Login() {
    return (
        <div>
            <button onClick={event =>  window.location.href='/login'}>
                Login
            </button>
        </div>
    )
}

export default Login;