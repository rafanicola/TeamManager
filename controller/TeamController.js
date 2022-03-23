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
            });

            const team = await Team.findAll({raw: true});
           
            res.render("equipes", {club: club.id, teams: team});
        }else{
            res.redirect("/login");
        }
    }

    static async addNewTeam(req, res){

        if(req.isAuthenticated()){

            const {teamName, teamType, trainingWeekDay, trainingStartAt, courtName, address, isActive} = req.body;
            
            const clubId = await Club.findOne({
                raw: true,
                where: {
                    fkUserId: req.user.id,
                }
            })

            const team = {
                teamName,
                teamType,
                trainingWeekDay,
                trainingStartAt,
                courtName,
                address,
                isActive,
                fkClubId: clubId.id,
            }

            if(team.isActive == 'on'){
                team.isActive = true;
            }else{
                team.isActive = false;
            }

            await Team.create(team).then(function(team){
                res.status(200).redirect("/adm/equipes");
            }).catch(function(err){
                if(err){
                    res.send(err);
                }
            });
        }
    }

    static async deleteTeam(req, res){

        const {deleteTeam} = req.body;

        if(req.isAuthenticated()){
            const isDeleted = await Team.destroy({
                where: {
                    id: deleteTeam
                }
            });
            
            if(isDeleted == 1){
                res.status(200).redirect("/adm/equipes")
            }else{
                res.send("Algo de errado aconteceu");
            }
        }else{
            res.redirect("/login");
        }
    }

    static async editTeam(req, res){
        
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
}

module.exports = TeamController;
