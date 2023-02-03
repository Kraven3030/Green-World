//==================
//   DEPENDENCIES  
//==================
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');
const config = require('../config/config')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require("../models");
const User = db.User;


// Checks is required fileds on signup for have been completed and will send erros otherwise
const validateSignUpInput = (username, email, password, password2) => {
    let errors = [];
    // Check required fields
    if (!username || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }
    // Check if password is correct
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' })
    }
    // Check password length is < 6
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' })
    }
    return {
        errors,
        isValid: errors.length === 0
    };
};

//=================================
//   SIGN UP ROUTE / CREATE USER
//=================================
router.post('/signup', (req, res) => {
    const { username, email, password, password2 } = req.body;
    const { errors, isValid } = validateSignUpInput(username, email, password, password2);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    // Checks to see if user already exists
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                // If user already exists
                errors.push({ msg: 'Email already in use' })
                return res.status(400).json(errors);
            } else {
                const newUser = new User({
                    username: username,
                    email: email,
                    password: password
                });
                // Uses bcrypt to hash the password
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // Set password to hashed
                        newUser.password = hash;
                        // Save new user
                        newUser.save()
                            .then(user => {
                                res.status(201).json({ message: 'User created successfully' })
                            })
                            .catch(err => console.log(err))
                    });
                });
            }
        });
});





//==================================
//   LOG IN ROUTE / FIND ONE USER
//==================================
// router.post('/login', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     try {
//         const user = await User.findOne({ username: req.body.username });
//         if (!user) {
//             return res.status(400).json({
//                 message: 'Username is not correct',
//             });
//         }

//         const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({
//                 message: 'Password is not correct',
//             });
//         }

//         const token = jwt.sign({ id: user._id }, config.jwtSecret);
//         return res.json({ user, token });
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// });






module.exports = router