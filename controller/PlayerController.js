const passport = require("passport")
const bodyParser = require("body-parser");
const Player = require("../models/PlayerModel");


class PlayerController{

    static getPlayerView(req, res){
        if(req.isAuthenticated()){
            res.render("atletas");
        }else{
            res.redirect("/login");
        }
    }

    static addNewPlayer(req, res){
        
    }
    
}

module.exports = PlayerController;