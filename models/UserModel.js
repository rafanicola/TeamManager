const { DataTypes } = require("sequelize");
const {conn} = require("../db/connection");

const User = conn.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(400),
        allowNull: false,
    }
});

module.exports = User;

