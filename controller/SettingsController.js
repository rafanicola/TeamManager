

class SettingsController{

    static getSettingsView(req, res){

        if(req.isAuthenticated()){
            res.render("settings");
        }else{
            res.redirect("/login")
        }
    }


}

module.exports = SettingsController;