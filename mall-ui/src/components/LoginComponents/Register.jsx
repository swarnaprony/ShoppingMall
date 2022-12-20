import React, { Component, useState, useEffect } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
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
                        console.log("Check Valid value")
                        console.log(result)
                        if (result.valid == undefined) {
                            handleSuccessfulRegistration(result)
                        }
                        if (result.valid == false) {
                            handleErrorMsgs(result)
                        }

                    })
            }
            )
            .catch((err) => {
                console.log();
            });
    };

    function handleSuccessfulRegistration(response) {
        alert("User Registration Successful")
        window.location.href = "http://localhost:3000/"
    }


    function handleErrorMsgs(response) {

        setErrMsgs(() => {
            console.log(response.errors)
            return response.errors
        })

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
        <MDBContainer fluid className="p-3 my-5 h-custom">

            <MDBRow>

                <MDBCol col='10' md='6'>
                    <img src="https://thumbs.dreamstime.com/z/line-to-airport-check-passenger-baggage-registration-desk-cartoon-vector-illustration-white-background-girl-waiting-82893670.jpg" class="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol col='4' md='6'>

                    <div className="d-flex flex-row align-items-center justify-content-center">

                        <p className="lead fw-normal mb-0 me-3">Sign up with</p>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <MDBIcon fab icon='facebook-f' />
                        </MDBBtn>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <MDBIcon fab icon='twitter' />
                        </MDBBtn>

                        <MDBBtn floating size='md' tag='a' className='me-2'>
                            <MDBIcon fab icon='linkedin-in' />
                        </MDBBtn>

                    </div>

                    <div className="divider d-flex align-items-center my-4">
                        <p class="text-primary text-center fw-bold mx-3 mb-0">Or</p>
                    </div>


                    <form className="form-example" action="" method="post">
                        
                            <h2 class="text-primary font-weight-bold deep-orange-lighter-hover mb-3">Register Here</h2>


                            <div id="userDiv" className="form-group was-validated">
                                <label class="text-primary" htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username" placeholder="Username..." name="username" value={newUser.username} onChange={handleChange} required />
                                <div id="username" className="invalid-feedback">{errMsgs.username}</div>
                            </div>

                            <div id="emailDiv" className="form-group was-validated">
                                <label class="text-primary" htmlFor="email">E-mail</label>
                                <input type="email" className="form-control email" id="email" placeholder="Your email" name="email" value={newUser.email} onChange={handleChange} required />
                                <div id="email" className="invalid-feedback" >{errMsgs.email}</div>
                            </div>
                            <div id="passwordDiv" className="form-group was-validated">
                                <label class="text-primary" htmlFor="password">Password</label>
                                <input type="password" className="form-control password" id="password" placeholder="Password..." name="password" value={newUser.password} onChange={handleChange} required />
                                <div className="invalid-feedback">{errMsgs.password}</div>
                            </div>
                            <div id="confirmPasswordDiv" className="form-group was-validated">
                                <label class="text-primary" htmlFor="password">Confirm Password</label>
                                <input type="password" className="form-control password" id="confirmPassword" placeholder="Confirm Password..." name="confirmPassword" value={newUser.confirmPassword} onChange={handleChange} required />
                                <div className="invalid-feedback">{errMsgs.confirmPassword}</div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-customized" onClick={handleSubmit}>Submit</button>
                        
                        </form>

                    <div className="d-flex justify-content-between mb-4">
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                        <a href="!#">Forgot password?</a>
                    </div>

                    <div className='text-center text-md-start mt-4 pt-2'>
                        <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
                        <p className="small fw-bold mt-2 pt-1 mb-2">Do you have an account already? <a href="http://localhost:3000/login" className="link-danger">Login</a></p>
                    </div>

                </MDBCol>

            </MDBRow>

            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

                <div className="text-white mb-3 mb-md-0">
                    <Footer />
                </div>
            </div>

        </MDBContainer>

    )
}

export default Register;
