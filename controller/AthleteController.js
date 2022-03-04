//const Athlete = require("../models/MasterModel");
const passport = require("passport")
const bodyParser = require("body-parser");


class AthleteController{

    // static accessAthleteView(req, res){
    //     //if(req.isAuthenticated()){
    //         Athlete.find({}, function(err, results){
    //             if(!err){
    //                 console.log(results)
    //                 res.render("atletas", {players: results});
    //             }else{
    //                 res.send(err);
    //             }
    //         });
    //     //}else{
    //         //res.redirect("/login");
    //     //}
    // }
    
    // static addAthlete(req, res){

    //     const player = new Athlete({
    //         playerName: req.body.athleteName,
    //         birthDate: req.body.birthDate,
    //         gender: req.body.gender,
    //         email: req.body.email,
    //         telephone: req.body.phone,
    //         gamePosition: req.body.gamePosition,
    //         playerLevel: req.body.playerLevel
    //     });
    //     console.log(player)
    //     player.save(function(err){
    //         if(!err){
    //             res.status(201).redirect("/adm/atletas");
    //         }else{
    //             res.send(err);
    //         }
    //     });
    // }

    // static deleteAthtlete(req, res){
    //     Athlete.findOneAndRemove({id: req.body.deletePlayer}, function(err){
    //         if(!err){
    //             res.redirect("/adm/atletas");
    //         }else{
    //             res.send(err);
    //         }
    //     })
    // }

    // static showAthleteInformation(req, res){
    //     Athlete.findById({_id: req.params.id}, function(err, result){
    //         if(!err){
    //             Team.find({}, function(err, teams){
    //                if(!err){
    //                    PlayerTeam.find({fkPlayerId: req.params.id}, function(err, playerTeam){
    //                         // console.log(playerTeam);
    //                         res.render("atletaDescription", {teams: teams, player: result})
    //                    })
    //                }else{
    //                    res.send(err);
    //                }
    //             });
    //         }else{
    //             res.send(err);
    //         }
    //     })
    // }

    // static associatePlayerAndTeam(req, res){
    //     const check = req.body.teamCheckboxes;
    
    //     const playerTeam = new PlayerTeam({
    //         fkPlayerId: req.params.id,
    //         fkTeamId: check
    //     });

    //     playerTeam.save(function(err){
    //         if(!err){
    //             res.redirect("/adm/atletas/playerdesc/" + req.params.id);
    //         }else{
    //             res.send(err);
    //         }
    //     })
    // }
}

module.exports = AthleteController;