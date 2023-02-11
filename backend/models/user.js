const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
})


//=============================
//   MODEL USING ITEM SCHEMA  
//=============================
const User = mongoose.model('User', userSchema)

//===================
//   EXPORT MODEL  
//===================
module.exports = User