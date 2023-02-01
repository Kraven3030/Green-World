//==================
//   DEPENDENCIES  
//==================
const express = require('express');
const router = express.Router();
const passport = require('../config/passport')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require("../models");
const User = db.User;

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


module.exports = router