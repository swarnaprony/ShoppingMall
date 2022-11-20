const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const mysql = require('mysql2');
const { check, validationResult } = require('express-validator');
const { PromiseProvider } = require("mongoose");


const app = express();

app.set("view engine", 'ejs');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.json());

app.use(express.static("public"));

app.use(cors({origin: ["http://localhost:3000", "http://192.168.0.229:3000"]}));


const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "MyNewPass",
  database: "shoppingMallDB",
  port: "3306"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Conected to mysql database");
})

app.get('/', function(req, res){
  console.log("Home")
})


app.get('/login', function(req, res){
  console.log("Login called");
})

app.get('/users', function(req, res) {
const selectUsers = "SELECT username FROM users";
con.promise().query(selectUsers).then( ([rows,fields]) => {
  console.log(rows);
  res.send(rows)
})
.catch(console.log)
})

app.get('/users/:userName', function(req, res) {
const selectUsers = "SELECT username FROM users WHERE username = '" + req.params.userName + "'";
con.promise().query(selectUsers).then( ([rows,fields]) => {
  res.send(rows)
})
.catch(console.log)
})



app.post('/users', function(req, res){
    console.log("Create new user:" + req.body);
    console.log(req.body.password, req.body.confirmPassword)

    var user = createUser(req.body);
    console.log(JSON.stringify(user));

    const validationResult = validateUsers(user)

    if (validationResult.valid == true) {
      saveUser(user);
    } else {
      console.log("User invalid")
      res.status(400);
      res.send(validationResult);
    }
      
});



app.listen(4000, function(){
    console.log("Server Started on Port 4000");
  }); 


  function createUser(prop) {
    return {
      "username" : prop.username,
      "email": prop.email,
      "password": prop.password,
      "confirmPassword" : prop.confirmPassword
    }
  }

  function validateUsers(user) {
    console.log(user.username)
    const validate = {
      "valid": true,
      "error": [
      ]
    }

    if (user.username == "" || user.username == null) {
      validate.valid = false
      validate.error.push({
        field: "username", 
        errorMessage: "Username field cannot be empty or null"
      })
    }
    if (user.email == null || user.email == "") {
      validate.valid = false
      validate.error.push({
        field: "email", 
        errorMessage: "Email field cannot be empty or null"
      })
    }
    if (user.password == null || user.password == "") {
      validate.valid = false
      validate.error.push({
        field: "password", 
        errorMessage: "Password field cannot be empty"
      })
    }
    if (user.password != user.confirmPassword || user.confirmPassword == "" || user.confirmPassword == null) {
      console.log("Check password")
      validate.valid = false
      validate.error.push({
        field: "confirmPassword", 
        errorMessage: "Password mismatched"
      })
    }
    return validate
  }


  function saveUser(user) {
    const insertUser = "INSERT INTO users (username, email, passsword)"
      + " VALUES ('" + user.username + "', '" + user.email + "', '" + user.password + "');"
      const selectUsers = "SELECT * FROM users";
      con.query(insertUser, function(err, result) {
        if (err) throw err;
      })};