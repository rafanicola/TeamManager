
const {DataTypes} = require("sequelize");
const {conn} = require("../db/connection");
const Team = require("../models/TeamModel");

const Club = conn.define("Club", {
    clubName: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    fkUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Club.hasMany(Team, {foreignKey: "fkClubId"});


module.exports = Club;