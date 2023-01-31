//==================
//   DEPENDENCIES  
//==================
const express = require('express');
const router = express.Router();
const passport = require('../config/passport')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = db.User;




module.exports = router