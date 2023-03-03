//==================
//   DEPENDENCIES  
//==================
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/config')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require("../models");
const User = db.User;


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret;

passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.error(err));
    })
);



// Checks if required fields on signup have been completed and will send errors otherwise
const validateSignUpInput = (username, email, password, password2) => {
    let errors = [];
    // Check required fields
    if (!username || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }
    // Checks if password is correct
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' })
    }
    // Checks password length is < 6
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
                    password: password,
                    password: password2
                });
                // Uses bcrypt to hash the password
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // Set password to hashed
                        newUser.password = hash;
                        // Save new user and sends message via json to inform user account has been created
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
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find the user in the database
    User.findOne({ username })
        .then(user => {
            if (!user) {
                // If user is not found, return an error
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Check if the password matches
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        // If the password doesn't match, return an error
                        return res.status(401).json({ message: 'Invalid username or password' });
                    }

                    // Create a JWT token for the user
                    const payload = { id: user.id, username: user.username };
                    jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }, (err, token) => {
                        if (err) throw err;
                        // Return the token as a response
                        res.json({ token });
                    });
                });
        });
});

//=======================================
//   GET USER DATA (IF USER IS LOGGED IN)
//=======================================
router.get('/:id', async (req, res) => {
    const foundUser = await User.findById(req.params.id)
    if (foundUser) {
        res.json(foundUser)
    } else {
        res.sendStatus(401)
    }
})


module.exports = router