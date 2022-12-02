import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
    const addUsers = async (newUser) => {
        await fetch("http://localhost:4000/users", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        })
            .then(response => {
                response.json()
                    .then(result => {
                        handleResponse(result)
                        handleErrorMsgs(result)
                    })
            }
            )
            .catch((err) => {
                console.log();
            });
    };

    function handleResponse(response) {
        setErrMsgs(() => {
            console.log(response.errors)
            return response.errors
        })
    }

    function handleErrorMsgs(response) {
        if (response.errors.username == "" || response.errors.username == undefined) {
            var userelement = document.getElementById("username");
            userelement.classList.remove("invalid-feedback");
            var userdivElement = document.getElementById("userDiv");
            userdivElement.classList.add("was-validated");
        } else {
            var element = document.getElementById("username");
            element.classList.add("is-invalid");
            var divElement = document.getElementById("userDiv");
            divElement.classList.remove("was-validated");
        }

        if (response.errors.email == "" || response.errors.email == undefined) {
            var element = document.getElementById("email");
            element.classList.remove("invalid-feedback");
            var divElement = document.getElementById("emailDiv");
            divElement.classList.add("was-validated");
        } else {
            var element = document.getElementById("email");
            element.classList.add("is-invalid");
            var divElement = document.getElementById("emailDiv");
            divElement.classList.remove("was-validated");
        }

        if (response.errors.password == "" || response.password == undefined) {
            var element = document.getElementById("password");
            element.classList.remove("invalid-feedback");
            var divElement = document.getElementById("passwordDiv");
            divElement.classList.add("was-validated");
        } else {
            var element = document.getElementById("password");
            element.classList.add("is-invalid");
            var divElement = document.getElementById("passwordDiv");
            divElement.classList.remove("was-validated");
        }
        console.log(response.errors.confirmPassword)

        if (response.errors.confirmPassword == "" || response.errors.confirmPassword == undefined) {
            console.log("Check Password error wrong")
            var conPassElement = document.getElementById("confirmPassword");
            conPassElement.classList.remove("invalid-feedback");
            var divConPassElement = document.getElementById("confirmPasswordDiv");
            divConPassElement.classList.add("was-validated");
        } else {
            console.log("Check Password error")
            var conPassElement = document.getElementById("confirmPassword");
            conPassElement.classList.add("is-invalid");
            var divConPassElement = document.getElementById("confirmPasswordDiv");
            divConPassElement.classList.remove("was-validated");
        }
        
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
            <div className="container h-100 position-relative">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-10 col-md-8 col-lg-6">

                        <form className="form-example" action="" method="post">
                            <h5>Register Here</h5>

                            <div id="userDiv" className="form-group was-validated">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username" placeholder="Username..." name="username" value={newUser.username} onChange={handleChange} required />
                                <div id="username" className="invalid-feedback">{errMsgs.username}</div>
                            </div>

                            <div id="emailDiv" className="form-group was-validated">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" className="form-control email" id="email" placeholder="Your email" name="email" value={newUser.email} onChange={handleChange} required />
                                <div id="email" className="invalid-feedback" >{errMsgs.email}</div>
                            </div>
                            <div id="passwordDiv"  className="form-group was-validated">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control password" id="password" placeholder="Password..." name="password" value={newUser.password} onChange={handleChange} required />
                                <div className="invalid-feedback">{errMsgs.password}</div>
                            </div>
                            <div id="confirmPasswordDiv" className="form-group was-validated">
                                <label htmlFor="password">Confirm Password</label>
                                <input type="password" className="form-control password" id="confirmPassword" placeholder="Confirm Password..." name="confirmPassword" value={newUser.confirmPassword} onChange={handleChange} required />
                                <div className="invalid-feedback">{errMsgs.confirmPassword}</div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-customized" onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>x
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default Register;
