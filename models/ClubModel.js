
const {DataTypes} = require("sequelize");
const {conn} = require("../db/connection");

const Club = conn.define("Club", {
    clubName: {
        type: DataTypes.STRING(250),
        allowNull: false
    }
});

module.exports = Club;