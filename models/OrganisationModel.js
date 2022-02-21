
const {DataTypes, Sequelize} = require("sequelize");
const conn = require("../db/connection");

const Organisation = conn.define("Organisation", {
    OrganisationName: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    CreatedBy: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
},
{
    timestamps: true,
    CreatedAt: true,
    UpdatedAt: 'updateTimestamp',
});

module.exports = Organisation;