const {DataTypes, Model} = require("sequelize");
const {conn} = require("../db/connection");

const Price = conn.define("Price", {
    unitQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

module.exports = Price;

