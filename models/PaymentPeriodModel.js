const {DataTypes} = require("sequelize");
const {conn} = require("../db/connection");

const PaymentPeriod = conn.define("PaymentPeriod", {
    period: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

module.exports = PaymentPeriod;