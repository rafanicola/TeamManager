const passport = require("passport")
const bodyParser = require("body-parser");
const {Op} = require("sequelize")
const Player = require("../models/PlayerModel");
const Team = require("../models/TeamModel");
const Club = require("../models/ClubModel");
const TeamPlayerAssociation = require("../models/TeamPlayerAssociation");
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
        if(req.isAuthenticated()){

            const {deletePlayer} = req.body;

            Club.findOne({
                raw: true,
                where: {
                    userId: req.user.id
                }
            }).then(function(club){
                Player.findOne({
                    raw: true,
                    where: {
                        id: deletePlayer
                    }
                }).then(function(player){
                    if(club.id == player.ClubId){
                        Player.destroy({
                            where: {
                                id: deletePlayer
                            }
                        });
                        res.status(200).redirect("/adm/atletas");
                    }else{
                        res.send("Algo deu errado");
                    }
                }).catch(function(err){
                    console.log(err);
                })
            }).catch(function(err){
                console.log(err);
            });
        }else{
            res.redirect("/login")
        }     
    }

    static async getPlayerDescriptionView(req, res){

        if(req.isAuthenticated()){
            Player.findAll({
                //raw: true,
                where: {
                    id: req.params.id
                },
                include: {
                    model: Team,
                    nested: true
                }
            }).then(function(association){
                //Busca times da equipe para renderizar no combo de associação.
                Team.findAll({
                    raw: true,
                    where: {
                        ClubId: req.user.id
                    }
                }).then(function(teams){
                    //res.send(association);
                    //console.log(association[0].Teams[0].TeamPlayerAssociation.id)
                    res.render("atletaDescription", {associations: association, teams: teams})
                }).catch(function(err){
                    console.log(err)
                })
            }).catch(function(err){
                console.log(err);
            });
        }else{
            res.redirect("/login");
        }
    }

    static savePlayerTeamAssociation(req, res){

        const { teamCheckboxes, playerId } = req.body;

        for(var i = 0; i < teamCheckboxes.length; i++){

            let association = {
                PlayerId: playerId,
                TeamId: teamCheckboxes[i],
            }

            TeamPlayerAssociation.create(association).then(function(association){
                console.log(association);
            }).catch((err)=> {
                console.log(err);
            });
            
        }
        res.redirect("/adm/atletas/playerdesc/" + playerId);
    }

    static deletePlayerAssociation(req, res){
        if(req.isAuthenticated()){
            
            const {deleteAssociation, playerId} = req.body;

            TeamPlayerAssociation.destroy({
                where:{
                    id: deleteAssociation
                }
            }).then(function(){
                res.redirect(`/adm/atletas/playerDesc/${playerId}`);
            }).catch(function(err){
                res.log(err);
            });
        }else{
            res.redirect("/login");
        }
    }

    //função que será chamada via xhr request.
    static async getTeams(req, res){
        
        if(req.isAuthenticated()){

            Team.findAll({
                raw: true,
            }).then(function(teams){
                return teams;
            });
        }else{
            res.redirect("/login");
        }
    }
}

module.exports = PlayerController;