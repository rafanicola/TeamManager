const passport = require("passport");
const Club = require("../models/ClubModel");
const Team = require("../models/TeamModel");
const User = require("../models/UserModel");
//const Team = require("../models/MasterModel");

class TeamController{
    
    static async accessTeamView(req, res){

        if(req.isAuthenticated()){
            
            const club = await Club.findOne({
                include: {
                    model: User,
                    as: "fkUser"
                }
            })

            res.render("equipes", {club: club.id});
        }else{
            res.redirect("/login");
        }
    }

    static async addNewTeam(req, res){

        if(req.isAuthenticated()){

            const {teamName, teamType, trainingWeekDay, trainingStartAt, courtName, address, isActive, clubId} = req.body;
            
            const team = {
                teamName,
                teamType,
                trainingWeekDay,
                trainingStartAt,
                courtName,
                address,
                isActive,
                fkClubId: clubId,
            }

            if(team.isActive == 'on'){
                team.isActive = true;
            }else{
                team.isActive = false;
            }

            await Team.create(team).then(function(team){
                res.redirect(200, "/adm/equipes");
            }).catch(function(err){
                if(err){
                    res.send(err)
                }
            });
        }


    }
}

module.exports = TeamController;
