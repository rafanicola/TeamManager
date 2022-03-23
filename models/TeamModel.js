const {DataTypes, Sequelize} = require("sequelize");
const {conn} = require("../db/connection");
const Club = require("../models/ClubModel");
const PlayerAssociation = require("./PlayerAssociationModel");
const Player = require("./PlayerModel");

const Team = conn.define("Teams", {
    teamName: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    trainingWeekDay:{
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    trainingStartAt: {
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    courtName: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
    courtAddress: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    }
});

Team.belongsTo(Club, {
    foreignKey: "fkClubId",
});


module.exports = Team;

