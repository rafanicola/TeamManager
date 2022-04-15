const {DataTypes, Sequelize, Model} = require("sequelize");
const {conn} = require("../db/connection");
const Club = require("../models/ClubModel");
const Player = require("../models/PlayerModel");
const TeamPlayerAssociation = require("./TeamPlayerAssociationModel");

class Team extends Model {}

Team.init({
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
},{
    sequelize: conn,
    modelName: "Team",
});

//Team.belongsToMany(Player, {through: "TeamPlayerAssociation"});

module.exports = Team;

// const Team = conn.define("Team", {
//     teamName: {
//         type: DataTypes.STRING(200),
//         allowNull: false
//     },
//     trainingWeekDay:{
//         type: DataTypes.STRING(15),
//         allowNull: false,
//     },
//     trainingStartAt: {
//         type: DataTypes.STRING(5),
//         allowNull: false,
//     },
//     courtName: {
//         type: DataTypes.STRING(150),
//         allowNull: true,
//     },
//     courtAddress: {
//         type: DataTypes.STRING(200),
//         allowNull: true,
//     },
//     isActive: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//         allowNull: false,
//     }
// });

// Team.belongsTo(Club, {
//     foreignKey: "fkClubId",
// })

// module.exports = Team;

