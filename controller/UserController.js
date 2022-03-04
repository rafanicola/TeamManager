const { json } = require("body-parser");
const User = require("../models/UserModel");
const Club = require("../models/ClubModel");
const bcrypt = require("bcrypt");
const passport = require("passport");


class UserController{

    static getRegisterView(req, res){
        res.render("register");
    }

    static async saveNewUser(req, res, next){
        const {fullname, email, password} = req.body;
        let newKey = bcrypt.hashSync(password, 10);

        const newUser = await User.findOne({
            where: {
                email: email
            }
        });

        if(!newUser){
            try{
                await User.create({
                    name: fullname,
                    email: email,
                    password: newKey,
                })
            }catch(err){
                return res.json({
                    status: "error",
                    error: err,
                });
            }
            res.json("User registerd");
        }else{
            res.json("User already exists")
        }
    }

    static getLoginView(req, res){
        res.render("login");
    }

    static async loginUser(req, res, next){

        passport.authenticate("local", function(err, user, info){
            if(err){
                return next(err);
            }
            if(!user){
                return res.json({
                    status: "error",
                    message: info.message,
                });
            }
            
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.logIn(user, function(err){
                    if(!err){
                        const club = await Club.findOne({
                            raw: true,
                            where: {
                                id: user.id
                            }
                        });
                        if(club){
                            res.status(200).redirect("/adm");
                        }else{
                            res.render("club");
                        }
                    }else{
                        return res.json(err);
                    }
                });
            }else{
                return res.json("wrong password")
            }
        })(req, res, next);
    }
}
module.exports = UserController;

