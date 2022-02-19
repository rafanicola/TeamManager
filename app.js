require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const helmet = require("helmet");
const morgan = require("morgan");
const mysql = require("mysql");

const app = express();

const secret = process.env.SECRET;
const User = require("./models/Users");

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

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/teammanager", {useNewUrlParser: true, useUnifiedTopology: true });

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


//MySQL
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "TeamManager"
});

conn.connect();
console.log(conn);
