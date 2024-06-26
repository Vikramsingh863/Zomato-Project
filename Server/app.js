const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./Route/index");
const dotenv = require('dotenv')
const PORT = process.env.PORT||5500;

const paymentRoute= require('./Controller/payment')
const authRoute = require('./Controller/auth')
const passportSetup = require('./Controller/passoport')
const passport = require('passport');

const cookieSession = require("cookie-session");
const corsOptions = {
    origin: `https://zomato-project-gray.vercel.app`,
    credentials: true,
    optionSuccessStatus: 200
}
dotenv.config();

const app = express();
app.use(express.json());        // A body Parser Required to post a data
app.use(cors(corsOptions));
app.use(cookieSession({name:"session", keys:["Vikram"], MaxAge:24*60*60*1000}))
app.use(passport.initialize());
app.use('/', route);
app.use(passport.session());
app.use('/api/payment',paymentRoute)
app.use('/auth',authRoute);


// DB
const MongoAtlas = process.env.MONGODB_URI;

mongoose.connect(MongoAtlas, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
    .then(res => {
        app.listen(PORT, () => {
            console.log(`Server is running at : ${PORT}`)
        });
    })
    .catch(err => console.log(err));