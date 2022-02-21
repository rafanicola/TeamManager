require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const helmet = require("helmet");
const morgan = require("morgan");
const mysql = require("mysql");
var MySQLStore = require('express-mysql-session')(session);
const User = require("./models/UserModel");


const conn = require("./db/connection");

const app = express();

const secret = process.env.SECRET;
//const User = require("./models/Users");

const teamRoute = require("./routes/TeamRoute");
const athleteRoute = require("./routes/AthletesRoute");
const userRoute = require("./routes/UserRoute");
const admRoute = require("./routes/AdmRoute");
const payRoute = require("./routes/PaymentRoute");

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(morgan("tiny"))
app.set('view engine', 'ejs');

app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "script-src": ["'self'", "https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js", "https://code.jquery.com/jquery-3.6.0.min.js", "https://use.fontawesome.com/releases/v5.15.4/css/all.css", 'https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js'],
    }
}));


const sessionStore = new MySQLStore({
    host: "127.0.0.1",
    port: 3306,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: "TeamManager",
})
app.use(session({
    secret: secret,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/adm/equipes", teamRoute);
app.use("/adm/atletas", athleteRoute);
app.use("/adm/pagamento", payRoute);
app.use("/", [userRoute, admRoute]);




app.listen(3000, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Server started on port 3000");
    }
})