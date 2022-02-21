const { DataTypes, Sequelize, Model } = require("sequelize");
const conn = require("../db/connection");

const User = conn.define("User", {
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    Password: {
        type: DataTypes.STRING(400),
        allowNull: false,
    }
},
{
    timestamps: true,
});

module.exports = User;

