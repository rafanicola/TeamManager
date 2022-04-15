const {DataTypes, Model} = require("sequelize");
const { conn } = require("../db/connection");
const Player = require("./PlayerModel");
const Team = require("./TeamModel");

class TeamPlayerAssociation extends Model {}

TeamPlayerAssociation.init({
    fkPlayerId: {
        type: DataTypes.INTEGER,
        references: {
            model: Player,
            key: 'id'
        }
    },
    fkTeamId: {
        type: DataTypes.INTEGER,
        references: {
            model: Team,
            key: 'id'
        }
    }
}, {
    sequelize: conn,
    modelName: "TeamPlayerAssociation",
});

TeamPlayerAssociation.associations = (models) => {

}

Player.belongsToMany(Team, {through: TeamPlayerAssociation});
Team.belongsToMany(Player, {through: TeamPlayerAssociation});

module.exports = TeamPlayerAssociation;