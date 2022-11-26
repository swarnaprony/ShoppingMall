const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const mysql = require('mysql2');
const { check, validationResult } = require('express-validator');
const { PromiseProvider } = require("mongoose");
const mysqlPromise = require('mysql2/promise');


const app = express();

app.set("view engine", 'ejs');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.json());

app.use(express.static("public"));

app.use(cors({ origin: ["http://localhost:3000", "http://192.168.0.229:3000"] }));


const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "MyNewPass",
  database: "shoppingMallDB",
  port: "3306"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Conected to mysql database");
})

app.get('/', function (req, res) {
  console.log("Home")
})


app.get('/login', function (req, res) {
  console.log("Login called");
})

app.get('/users', function (req, res) {
  const selectUsers = "SELECT username FROM users";
  con.promise().query(selectUsers).then(([rows, fields]) => {
    console.log(rows);
    res.send(rows)
  })
    .catch(console.log)
})

app.get('/users/:userName', function (req, res) {
  const selectUsers = "SELECT username FROM users WHERE username = '" + req.params.userName + "'";
  
  con.promise().query(selectUsers).then(([rows, fields]) => {
    res.send(rows)
  })
  .catch(console.log)
})



app.post('/users', function (req, res) {

  var user = createUser(req.body);
  console.log(JSON.stringify(user));

  con.query("SELECT username FROM users WHERE username = '" + user.username + "'", function (err, result, fields) {
    if (err) throw err;
    console.log("Username Test")
    console.log(result);
    var user_found = result[0]
    
    var validationResult = validateUsers(user, user_found)
    
    if (validationResult.valid == true) {
      saveUser(user);
      res.send(user);
    } else {
      console.log(validationResult)
      res.status(400);
      res.send(validationResult);
    }
  })

});


function createUser(prop) {
  return {
    "username": prop.username,
    "email": prop.email,
    "password": prop.password,
    "confirmPassword": prop.confirmPassword
  }
}

function validateUsers(user, user_found) {

  const validate = {
    "valid": true,
    "errors": {}
  }

  console.log(user_found.username)

  if (user_found.username === user.username.toLowerCase()) {
    console.log("user found called")
    validate.valid = false
    validate.errors["username"] = "Username alredy exists. Give an unique username"
  } else {
    if (user.username == null || user.username == "") {
      validate.valid = false
      validate.errors["username"] = "Username field cannot be empty or null"
    }
  }

  if (user.email == null || user.email == "") {
    validate.valid = false
    validate.errors["email"] = "Email field cannot be empty or null"
  }

  if (user.password == null || user.password == "") {
    validate.valid = false
    validate.errors["password"] = "Password field cannot be empty"
  }

  if (user.password != user.confirmPassword || user.confirmPassword == "" || user.confirmPassword == null) {
    console.log("Check password")
    validate.valid = false
    validate.errors["confirmPassword"] = "Password mismatched"
  }

  return validate

}


function saveUser(user) {
  const insertUser = "INSERT INTO users (username, email, passsword)"
    + " VALUES ('" + user.username + "', '" + user.email + "', '" + user.password + "');"
  const selectUsers = "SELECT * FROM users";
  console.log("Error Found")
  con.query(insertUser, function (error, result) {
    if (error) throw error;
  })
};



app.listen(4000, function () {
  console.log("Server Started on Port 4000");
}); 