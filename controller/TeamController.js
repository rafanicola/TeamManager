const passport = require("passport");
const Club = require("../models/ClubModel");
const Team = require("../models/TeamModel");
const User = require("../models/UserModel");

class TeamController{
    
    static async accessTeamView(req, res){

        if(req.isAuthenticated()){

            Team.findAll({
                raw: true,
                include: {
                    model: Club,
                    where: {
                        UserId: req.user.id,
                    }
                }
            }).then(function(teams){
                res.render("equipes", { teams: teams});
            }).catch(function(err){
                res.send(err);
            });
        }else{
            res.redirect("/login");
        }
    }

    static async addNewTeam(req, res){

        if(req.isAuthenticated()){

            let {teamName, teamType, trainingWeekDay, trainingStartAt, courtName, address, isActive} = req.body;

            if(isActive == 'on'){
                isActive = true;
            }else{
                isActive = false;
            }

           Club.findOne({
                raw: true,
                where: {
                    UserId: req.user.id
                }
            }).then(function(club){
                Team.create({
                    teamName,
                    teamType,
                    trainingWeekDay,
                    trainingStartAt,
                    courtName,
                    courtAddress: address,
                    isActive,
                    ClubId: club.id,
                }).then(function(team){
                    if(team){
                        console.log(team);
                        res.status(200).redirect("/adm/equipes");
                    }else{
                        res.send("Not saved");
                    }
                }).catch(function(err){
                    console.log(err);
                })
            }).catch(function(err){
                res.send(err);
            });
        }
    }

    static async deleteTeam(req, res){

        const {deleteTeam} = req.body;

        if(req.isAuthenticated()){

            Team.findAll({
                raw: true,
                where: {
                    id: deleteTeam
                }
            }).then(function(team){
                console.log(team[0].ClubId);
                Club.findOne({
                    raw: true,
                    where: {
                        id: team[0].ClubId,
                    }
                }).then(function(club){
                    console.log(club);
                    if(req.user.id == club.UserId){
                        Team.destroy({
                            where: {
                                id: deleteTeam,
                            }
                        }).then(function(){ res.redirect("/adm/equipes")} ).catch(function(err){res.send(err)})
                    }else{
                        console.log("Cannot Delete");
                    }
                }).catch((err) => {
                    res.send(err)
                });
            }).catch(function (err) { 
                res.send(err);
            });
        }else{
            res.redirect("/login");
        }
    }

    static async updateTeam(req, res){
        
        const { teamid, teamNameEdit, teamTypeEdit, trainingWeedDayEdit, trainingStartAtEdit, courtNameEdit, addressEdit, isActiveEdit } = req.body;

        let isActive;

        if(req.isAuthenticated()){

            if(isActiveEdit == 'on'){
                isActive = 1;
            }else{
                isActive = 0;
            }
            
            try{
                const isOk = await Team.update({
                    teamName: teamNameEdit,
                    trainingWeekDay: trainingWeedDayEdit,
                    trainingStartAt: trainingStartAtEdit,
                    courtName: courtNameEdit,
                    courtAddress: addressEdit,
                    isActive: isActive,
                },{
                    where: {
                        id: teamid
                    }
                });
                
                if(isOk){
                    res.redirect("/adm/equipes")
                }else{
                    res.send(isOk)
                }
            }catch(err){
                res.send("Erro ao atualizar equipe: " + err);
            }
        }else{
            res.redirect("/login")
        }
    }

    /* This method should be implemented to get the xhr 
    requested data on edit team functionality */
    // static getTeamById(req, res){
        
    // }
}

module.exports = TeamController;
