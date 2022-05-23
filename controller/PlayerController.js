const passport = require("passport")
const bodyParser = require("body-parser");
const Player = require("../models/PlayerModel");
const Team = require("../models/TeamModel");
const Club = require("../models/ClubModel");

class PlayerController{

    static async getPlayerView(req, res){
        if(req.isAuthenticated()){

            Club.findOne({
                raw: true,
                where: {
                    userId: req.user.id,
                }
            }).then(function(club){
                Player.findAll({
                    raw: true,
                    where: {
                        ClubId: club.id,
                    }
                }).then(function(players){
                    res.render("atletas", { players: players});
                }).catch(function(err){
                    res.send(err);
                })
            }).catch(function(err){
                res.send(err)
            });

        }else{
            res.redirect("/login");
        }
    }

    static async addNewPlayer(req, res){
        
        if(req.isAuthenticated()){

            const {playerName, birthDate, gender, email, phone, gamePosition, playerLevel} = req.body;
            let isActive = req.body;

            console.log("Valor do IsActive: " + isActive);

            if(isActive == 'on'){
                isActive = 1;
            }else{
                isActive = 0;
            }
            
            console.log("Valor do isActive: " + isActive);

            Club.findOne({
                raw: true,
                where: {
                    userId: req.user.id
                }
            }).then(function(club){

                const player = {
                    playerName,
                    birthDate,
                    gender,
                    email,
                    phone,
                    gamePosition,
                    playerLevel,
                    isActive,
                    ClubId: club.id,
                }

                Player.create(player).then(function(isCreated){
                    res.status(200).redirect("/adm/atletas");
                }).catch(function(err){
                    res.send(err);
                })
            }).catch(function(err){
                res.send(err);
            })

        }else{
            res.redirect("/login");
        }
    }

    static async deletePlayer(req, res){
        const {deletePlayer} = req.body;

        if(req.isAuthenticated()){
            
            const isDeleted = await Player.destroy({
                where: {
                    id: deletePlayer
                }
            });

            if(isDeleted == 1){
                res.status(200).redirect("/adm/atletas");
            }else{
                res.send("Algo deu errado");
            }
        }else{
            res.redirect("/login");
        }
    }

    static async getPlayerDescriptionView(req, res){

        if(req.isAuthenticated()){
            Player.findOne({
                raw: true,
                where: {
                    id: req.params.id,
                }
            }).then(function(player){
                res.render("atletaDescription", { player: player});
            })
        }
    }

    static async savePlayerTeamAssociation(req, res){

        const { teamCheckboxes, userId } = req.body;

        console.log(teamCheckboxes.length);

        for(var i = 0; i < teamCheckboxes.length; i++){

            let association = {
                fkUserId: userId,
                fkTeamId: teamCheckboxes[i],
                isActive: 1,
            }

            let associated = await PlayerAssociation.create(association);
        }

        res.redirect("/adm/atletas/playerdesc/" + userId);
    }

    static async deletePlayerAssociation(req, res){
        
        if(req.isAuthenticated()){
            
            const {deleteAssociation, playerId} = req.body;

            const isDeleted = await PlayerAssociation.destroy({
                where: {
                    id: deleteAssociation,
                }
            });

            if(isDeleted){
                res.redirect("/adm/atletas/playerdesc/" + playerId);
            }

        }



    }
}

module.exports = PlayerController;