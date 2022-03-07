const {DataTypes, Sequelize} = require("sequelize");
const {conn} = require("../db/connection");
const Club = require("../models/ClubModel");

const Team = conn.define("Teams", {
    teamName: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    trainingWeekDay:{
        type: DataTypes.STRING(10),
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
    as: "fkClub"
})

module.exports = Team;

