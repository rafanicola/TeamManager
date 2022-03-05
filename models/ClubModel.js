
const {DataTypes, Sequelize} = require("sequelize");
const {conn} = require("../db/connection");
const User = require("./UserModel");

const Club = conn.define("Club", {
    clubName: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
});

Club.belongsTo(User, {
    as: "fkUser",
    allowNull: false,
})

module.exports = Club;