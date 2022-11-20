import React, {Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Footer from "../Footer";
import 'bootstrap/dist/css/bootstrap.css';
import Header from "../Header";
import Home from "../Home";

function Register(
) {

    // Creating newUser in Backend
    const addUsers = async (newUser) => {
        await fetch("http://localhost:4000/users", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then(handleResponse)
            .catch(handleError)
    };

    function handleError(err) {
        console.log(err)
    }

    function handleResponse(response) {
        console.log(JSON.stringify(response.json()))
    }

    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewUser((prevValue) => {
            return {
                ...prevValue, [name]: value
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addUsers(newUser);
        window.location = "/"

    }
    return (
        <div>
            <div class="container h-100 position-relative">
                <div class="row h-100 justify-content-center align-items-center">
                    <div class="col-10 col-md-8 col-lg-6">

                        <form class="form-example" action="" method="post">
                            <h5>Register Here</h5>
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" class="form-control username" id="username" placeholder="Username..." name="username" value={newUser.username} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="email">E-mail</label>
                                <input type="email" class="form-control email" id="email" placeholder="Your email" name="email" value={newUser.email} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control password" id="password" placeholder="Password..." name="password" value={newUser.password} onChange={handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control confirmPassword" id="confirmPassword" placeholder="Confirm Password..." name="confirmPassword" value={newUser.confirmPassword} onChange={handleChange} />
                            </div>
                            <button type="submit" class="btn btn-primary btn-customized" onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default Register;
