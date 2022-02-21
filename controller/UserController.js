const bcrypt = require("");
const passport = require("passport");
const User = require("../models/UserModel");

class UserController{

    static getLoginPage(req, res){
        res.render("login");
    }

    static saveNewUser(req, res){
        User.register({username: req.body.username}, req.body.password, function(err, user){
            if(err){
                res.redirect("/login");
            }else{
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/adm");
                })
            }
        })
    }
    
    static getOrganizationPage(req, res){
        res.render("organisation");
    }
}

module.exports = UsersController;

