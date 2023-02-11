const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose")

const Session = new mongoose.Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, rquired: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    authStrategy: { type: String, default: "local" },
    points: { type: Number, default: 50 },
    refreshToken: { type: [Session] },
    date: { type: Date, default: Date.now }
})



//=============================
//   MODEL USING ITEM SCHEMA  
//=============================
const User = mongoose.model('User', userSchema)
//Remove refreshToken from the response
User.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
})

User.plugin(passportLocalMongoose)

//===================
//   EXPORT MODEL  
//===================
module.exports = User