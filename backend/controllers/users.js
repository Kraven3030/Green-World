//==================
//   DEPENDENCIES  
//==================
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require("../models");
const User = db.User;


//=================================
//   SIGN UP ROUTE / CREATE USER
//=================================
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        });
        await newUser.save();
        res.send({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

//==================================
//   LOG IN ROUTE / FIND ONE USER
//==================================
router.post('/login', async (req, res, next) => {
    if (!req.user) {
        return res.status(400).json({
            message: 'Username or Password is not correct',
            user: req.user
        })
    }
    req.login(user, { session: false }, (error) => {
        if (error) {
            res.send(error)
        }
        const token = jwt.sign(user, config.jwtSecret)
        return res.json({ user, token })
    })
})




module.exports = router