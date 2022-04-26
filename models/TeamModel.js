const {DataTypes, Sequelize, Model} = require("sequelize");
const {conn} = require("../db/connection");


const Team = conn.define("Team", {
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

module.exports = Team;

