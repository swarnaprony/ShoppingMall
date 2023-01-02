import React, { Component, useState, useEffect } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "../Header";
import Home from "../Home";
import Footer from "../Footer";

function Login() {

  var [errMsgs, setErrMsgs] = useState({
    "email": "",
    "password": ""
  })


  // Creating newUser in Backend
  const checkUsers = async (newUser) => {
    await fetch("http://localhost:4000/userlogin", {
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
              handleSuccessfulLogin(result)
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

  function handleSuccessfulLogin(response) {
    alert("User Login Successful")
    window.location.href = "http://localhost:3000/"
  }

  function handleErrorMsgs(response) {

    setErrMsgs(() => {
      console.log(response.errors)
      return response.errors
    })

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

    console.log("Print errors")
    console.log(response.errors.password)

    if (response.errors.password == "" || response.errors.password == undefined) {
      console.log("Valid password called")
      var element = document.getElementById("password");
      element.classList.remove("invalid-feedback");
      var divElement = document.getElementById("passwordDiv");
      divElement.classList.add("was-validated");
    } else {
      console.log("Invalid password called")
      var element = document.getElementById("password");
      element.classList.add("is-invalid");
      var divElement = document.getElementById("passwordDiv");
      divElement.classList.remove("was-validated");
    }

  }

  const [newUser, setNewUser] = useState({
    email: "",
    password: ""
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
    checkUsers(newUser);
  }



  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://static6.depositphotos.com/1030387/578/v/950/depositphotos_5782079-stock-illustration-security-checkpoint-line.jpg" class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

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
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
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

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
          <button type="submit" className="btn btn-primary btn-customized" onClick={handleSubmit}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="http://localhost:3000/register" className="link-danger">Register</a></p>
          </div>

        </MDBCol>

      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

        <div className="text-white mb-3 mb-md-0">
          <Footer />
        </div>

        <div>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="md" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='twitter' size="md" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='google' size="md" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='linkedin-in' size="md" />
          </MDBBtn>

        </div>

      </div>

    </MDBContainer>
  );
}

export default Login;
<Footer />