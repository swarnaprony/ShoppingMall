const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", 'ejs');

app.use(express.json());

app.use(express.static("public"));

app.use(cors({origin: ["http://localhost:3000", "http://192.168.0.229:3000"]}));

mongoose.connect("mongodb+srv://admin-swarna:eENsnPzypRAZ0OlT@cluster0.alvs2jv.mongodb.net/ShoppingMall");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

app.get('/', function(req, res){
    User.find(function(err, foundUsers){
        if (!err) {
            res.send(foundUsers);
        } else {
            res.send(err);
        }
    })
})

app.post('/', function(req, res){

    console.log(req.body)

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save(function(err){
        if (!err) {
            res.send(newUser);
        } else {
            res.send(err);
        }
    });
});

app.listen(4000, function(){
    console.log("Server Started on Port 4000");
});  

  