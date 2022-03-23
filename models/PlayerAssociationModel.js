const {conn} = require("../db/connection");
const {DataTypes, Sequelize} = require("sequelize");
const Player = require("./PlayerModel");
const Team = require("./TeamModel");

const PlayerAssociation = conn.define("PlayerAssociation", {
    // fkPlayerId:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false,   
    // },
    // fkTeamId: {
    //     type: DataTypes.INTEGER,
    // },
    isActive: {
        type: DataTypes.BOOLEAN
    },
});

module.exports = PlayerAssociation;