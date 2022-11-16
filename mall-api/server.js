const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const mysql = require('mysql2');


const app = express();

app.set("view engine", 'ejs');

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
  console.log("Home");
})

app.post('/users', function(req, res){
    console.log("Create new user:" + req.body);
    const insertUser = "INSERT INTO users (username, email, passsword)"
    + " VALUES ('" + req.body.username + "', '" + req.body.email + "', '" + req.body.password + "');"
    const selectUsers = "SELECT * FROM users";
    con.query(insertUser, function(err, result) {
      if (err) throw err;
      console.log("Result:" + result);
    });
});

app.get('/login', function(req, res){
    console.log("Login called");
})

app.get('/users', function(req, res) {
  console.log("Users called");
})

app.listen(4000, function(){
    console.log("Server Started on Port 4000");
  });  