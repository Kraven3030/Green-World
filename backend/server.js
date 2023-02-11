// +-+-+-+-+-+-+-+-+-+-+-+-+
// |D|E|P|E|N|D|E|N|C|I|E|S|
// +-+-+-+-+-+-+-+-+-+-+-+-+
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const methodOverride = require('method-override');
const cors = require('cors');
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

// Access to controllers
const usersCtrl = require('./controllers/users.js')


// +-+-+-+-+-+-+-+-+-+-+
// |M|I|D|D|L|E|W|A|R|E|
// +-+-+-+-+-+-+-+-+-+-+
app.use(cors())
// Parse the body data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'));
app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
    ? process.env.WHITELISTED_DOMAINS.split(",")
    : []

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },

    credentials: true,
}

app.use(cors(corsOptions))

app.get("/", function (req, res) {
    res.send({ status: "success" })
})

// +-+-+-+-+-+-+
// |R|O|U|T|E|S|
// +-+-+-+-+-+-+
app.use('/users', usersCtrl)



// +-+-+-+-+-+-+-+-+
// |L|I|S|T|E|N|E|R|
// +-+-+-+-+-+-+-+-+
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})