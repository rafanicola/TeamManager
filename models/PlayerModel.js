const {DataTypes, Sequelize} = require("sequelize");
const {conn} = require("../db/connection");
const PlayerAssociation = require("./PlayerAssociationModel");
const Team = require("./TeamModel");

const Player = conn.define("Players", {
    playerName: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(1)
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    gamePosition: {
        type: DataTypes.STRING(20)
    },
    playerLevel: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },   
});



module.exports = Player;    