const {DataTypes, Sequelize, Model} = require("sequelize");
const {conn} = require("../db/connection");

const TeamPlayerAssociation = conn.define("TeamPlayerAssociation", {
    
},{
    paranoid: true,
    deletedAt: 'destroyTime'
});

module.exports = TeamPlayerAssociation;