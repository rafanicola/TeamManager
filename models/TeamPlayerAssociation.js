const {DataTypes, Sequelize, Model} = require("sequelize");
const {conn} = require("../db/connection");

const TeamPlayerAssociation = conn.define("TeamPlayerAssociation", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
},{
    paranoid: true,
    deletedAt: 'destroyTime'
});

module.exports = TeamPlayerAssociation;