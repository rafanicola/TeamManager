const Club = require("../models/ClubModel");
const User = require("../models/UserModel");

class ClubController{
    
    static saveNewClub(req, res){
        
        const {clubname} = req.body;

        Club.create({
            clubName: clubname,
            UserId: [req.user.id]
        }, {
            include: [User]
        }).then(function(club){
            if(club){
                if(req.isAuthenticated()){
                    res.redirect("/adm")
                }else{
                    res.redirect("/login");
                }
            }else{
                res.send("erro");
            }
        }).catch(function(err){
            if(err){
                res.send(err);
            }
        })
    }
}

module.exports = ClubController;