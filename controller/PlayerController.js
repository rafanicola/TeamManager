const passport = require("passport")
const bodyParser = require("body-parser");
const Player = require("../models/PlayerModel");
const Team = require("../models/TeamModel");

class PlayerController{

    static async getPlayerView(req, res){
        if(req.isAuthenticated()){
            const players = await Player.findAll();
            res.render("atletas", {players: players});
        }else{
            res.redirect("/login");
        }
    }

    static async addNewPlayer(req, res){
        
        if(req.isAuthenticated()){

            const {playerName, birthDate, gender, email, phone, gamePosition, playerLevel} = req.body;
            let isActive = req.body;
            
            if(isActive == 'on'){
                isActive = 1;
            }else{
                isActive = 0;
            }
            
            const player = {
                playerName,
                birthDate,
                gender,
                email,
                phone,
                gamePosition,
                playerLevel,
                isActive
            }
            
            await Player.create(player).then(function(err){
                res.status(200).redirect("/adm/atletas");
            }).catch(function(err){
                if(err){
                    res.send(err);
                }
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

        const date = new Date();
        console.log(date);
        
        if(req.isAuthenticated()){
            
            const player = await Player.findOne({
                raw: true,
                where: {
                    id: req.params.id,
                }
            });

            
            if(player){

                const teams = await Team.findAll({
                    raw: true,
                });

                const playerAssociations = await PlayerAssociation.findAll({
                    include: {
                        model: Team,
                        
                        
                    },
                    raw: true,
                    where: {
                        fkUserId: player.id
                    }
                });
               
                console.log(playerAssociations);
                res.status(200).render("atletaDescription", {player: player, teams: teams, associations: playerAssociations})
            }else{
                res.send("Error: player not found");
            }  
        }else{
            res.redirect("/login");
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