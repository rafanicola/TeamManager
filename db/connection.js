const { Sequelize } = require("sequelize");

const conn = new Sequelize("TeamManager", {
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    host: process.env.DBHOST,
    dialect: "mysql"
});

try{
    conn.authenticate(function(err){
        if(!err){
            console.log("Connected to the database");
        }else{
            console.log(err);
        }
    });
}catch(err){
    console.log(err);
}

module.exports = conn;