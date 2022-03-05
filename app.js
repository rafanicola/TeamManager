require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const helmet = require("helmet");
const morgan = require("morgan");
const mysql = require("mysql");
var MySQLStore = require('express-mysql-session')(session);
//Models
const User = require("./models/UserModel");
const Club = require("./models/ClubModel");
const {conn} = require("./db/connection");

const app = express();

const teamRoute = require("./routes/TeamRoute");
const userRoute = require("./routes/UserRoute");
const admRoute = require("./routes/AdmRoute");
const clubRoute = require("./routes/ClubRoute");
const settingsRoute = require("./routes/SettingsRoute");

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

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBASE
});

app.use(session({
    //key: 'session',
    secret: process.env.SECRET,
    //store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: false,
}, async function(email, password, done){

    let user = await User.findOne({
        raw: true,
        where: {
            email: email,
        }
    });

    if(!user){
        return done(null, false, { message: "User not found"});
    }else{
        return done(null, user);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, {id: user.id, email: user.email, name: user.name});
});
  
passport.deserializeUser(function(user, done) {
    done(null, {id: user.id, email: user.email, name: user.name});
});



app.use("/adm", [settingsRoute, teamRoute]);
app.use("/", [userRoute, admRoute, clubRoute]);


conn.sync().then(function(){
    app.listen(3000, function(err){
        if(!err){
            console.log("Server started on port 3000");
        }else{
            console.log(err);
        }
    })
}).catch(function(err){
    console.log(err);
})