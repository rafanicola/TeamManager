const { DataTypes, Sequelize } = require("sequelize");
const {conn} = require("../db/connection");
const Team = require("./TeamModel");

const TeamGender = conn.define("TeamGender", {
    teamGender: {
        type: DataTypes.VARCHAR(9),
        allowNull: false
    }
});

module.exports = TeamGender;