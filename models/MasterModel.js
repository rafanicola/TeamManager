const mongoose = require("mongoose");

//Team///////////////////////////////////////////////////
const teamSchema = new mongoose.Schema({
    teamName: String,
    clubName: String,
    teamType: String,
    address: String,
    trainingWeekDay: String,
    trainingTime: String
    // activeStatus: Boolean
});

const Team = mongoose.model("Teams", teamSchema);

module.exports = Team;

//Athlete///////////////////////////////////////////////////
const athletSchema = new mongoose.Schema({
    playerName: String,
    birthDate: Date,
    gender: String,
    email: String,
    telephone: String,
    gamePosition: String,
    playerLevel: String
}, {
    timestamps: true,
})

const Athlete = mongoose.model("Athletes", athletSchema);

module.exports = Athlete;

//PlayerTeam///////////////////////////////////////////////////
const playerTeamSchema = new mongoose.Schema({
    fkPlayerId: mongoose.ObjectId,
    team: teamSchema,
})

const PlayerTeam = mongoose.model("PlayerTeamAssociation", playerTeamSchema);

module.exports = PlayerTeam;

