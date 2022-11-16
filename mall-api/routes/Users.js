
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { username , password , email } = req.body;

    bcrypt.hash(password, 10).then((hash)=>{
        User.create({
            username: username,
            password: hash,
            email: email,
            // this here just for safety
            admin: false,
            approved: false,
        });
        res.json('Successful');
    });

});


router.post('/login', async (req, res) => {
    
    const { username , password } = req.body;

    const user = await User.findOne({ where: {username: username}});

    // if the user is not in the table
    if (!user){
        res.json({error: "User doesn't exist!"});
    }
    else{

        if (user.approved===false){
            res.json({error: "approval"});
        }
        else{

            bcrypt.compare(password, user.password).then((matched)=>{
                if(!matched){
                    res.json({error: "Wrong User Credentials!"});
                }
                else{
                    res.json({message:"User matched"})
                }
            });

        }

        
    }

});


module.exports = router;