const Club = require("../models/ClubModel");


class ClubController{

    static async saveNewClub(req, res){
        
        const {clubname} = req.body;

        const newClub = await Club.create({
            clubName: clubname,
            fkUserId: req.user.id,
        });
        
        const created = await Club.findOne({
            raw: true,
            where: {
                clubName: clubname,
            }
        });

        if(created && req.isAuthenticated()){
            res.redirect("/adm");
        }else{
            res.send("erro");
        }

    }


}

module.exports = ClubController;