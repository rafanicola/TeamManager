const { connect } = require("mongoose");
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

async function findUser(username){
    const conn = await connect();
    const [rows] = await conn.query(`SELECT * FROM User WHERE email =? LIMIT 1`, [username]);
    if(rows.length > 0){
        return rows[0]
    }else{
        return null
    }
}
async function findUserById(id){
    const conn = await connect();
    const [rows] = await conn.query(`SELECT * FROM User WHERE id=? Limit 1`, [id]);
    if(rows.length > 0){
        return rows[0];
    }else{
        return null;
    }
}

module.exports = {conn, findUser, findUserById};