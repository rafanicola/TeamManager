const passport = require("passport");
const Team = require("../models/TeamModel");
//const Team = require("../models/MasterModel");

class TeamController{
    
    static async accessTeamView(req, res){

        if(req.isAuthenticated()){
            const teams = await Team.findAll({raw: true});
            res.render("equipes", { items: teams})
        }else{
            res.redirect("/login");
        }
    }

    // static addTeam(req, res){
    //     if(req.isAuthenticated()){
    //         const team = new Team({
    //             teamName: req.body.teamName,
    //             clubName: req.body.clubName,
    //             teamType: req.body.teamType,
    //             address: req.body.address,
    //             trainingWeekDay: req.body.trainingWeekDay,
    //             trainingTime: req.body.trainingTime
    //         });
    //         team.save(function(err){
    //             if(!err){
    //                 res.status(201).redirect("/adm/equipes");
    //             }else{
    //                 res.send(err);
    //             }
    //         });
    //     }else{
    //         res.redirect("/login");
    //     }
    // }

    // static deleteTeam(req, res){
    //     Team.findOneAndRemove({id: req.body.deleteItem}, function(err){
    //         if(err){
    //             res.send(err);
    //         }else{
    //             res.redirect("/adm/equipes");
    //         }
    //     })
    // }
}

module.exports = TeamController;
