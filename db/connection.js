const { Sequelize } = require("sequelize");

const conn = new Sequelize("TeamManager", process.env.DBUSER, process.env.DBPASS, {
    host: process.env.DBHOST,
    dialect: "mysql",
});

try{
    conn.authenticate();
}catch(err){
    console.log(err);
}


module.exports = {conn};