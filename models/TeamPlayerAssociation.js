const {DataTypes, Sequelize, Model} = require("sequelize");
const {conn} = require("../db/connection");

const TeamPlayerAssociation = conn.define("TeamPlayerAssociation", {

});

module.exports = TeamPlayerAssociation;