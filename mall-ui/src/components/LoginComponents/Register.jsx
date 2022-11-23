import React, {Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Footer from "../Footer";
import 'bootstrap/dist/css/bootstrap.css';
import Header from "../Header";
import Home from "../Home";

function Register() {

    var [errMsgs, setErrMsgs] = useState({
        "username": "",
        "email": "",
        "password": "",
        "confirmPassword": ""
    })

    // Creating newUser in Backend
    const addUsers = async(newUser) => {
        await fetch("http://localhost:4000/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        })
        .then(response => {
                response.json()
                    .then(result => { handleResponse(result) }) 
            }
        )
        .catch((err) => {
          console.log(err.message);
        });
      };

    function handleResponse(response) {
        setErrMsgs(() => {
            return response.errors
        })
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
    };


    

    const handleSubmit = (event) => {
        event.preventDefault();
        addUsers(newUser);
    }

    return (
        <div>
            <div class="container h-100 position-relative">
                <div class="row h-100 justify-content-center align-items-center">
                    <div class="col-10 col-md-8 col-lg-6">

                        <form class="form-example" action="" method="post">
                            <h5>Register Here</h5>

                            <div class="form-group was-validated">
                                <label for="username">Username</label>
                                <input type="text" class="form-control username" id="username" placeholder="Username..." name="username" value={newUser.username} onChange={handleChange}  required/>
                                <div class="invalid-feedback">{errMsgs.username}</div>
                            </div>

                            <div class="form-group was-validated">
                                <label for="email">E-mail</label>
                                <input type="email" class="form-control email" id="email" placeholder="Your email" name="email" value={newUser.email} onChange={handleChange} required/>
                                <div class="invalid-feedback">{errMsgs.email}</div>
                            </div>
                            <div class="form-group was-validated">
                                <label for="password">Password</label>
                                <input type="password" class="form-control password" id="password" placeholder="Password..." name="password" value={newUser.password} onChange={handleChange} required/>
                                <div class="invalid-feedback">{errMsgs.password}</div>
                            </div>
                            <div class="form-group was-validated">
                                <label for="password">Password</label>
                                <input type="password" class="form-control confirmPassword" id="confirmPassword" placeholder="Confirm Password..." name="confirmPassword" value={newUser.confirmPassword} onChange={handleChange} required/>
                                <div class="invalid-feedback">{errMsgs.confirmPassword}</div>
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
