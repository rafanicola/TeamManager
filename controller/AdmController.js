
class AdmController{

    static getAdmRoute(req, res, isAuthenticated){
        if(req.user){
            console.log(req.user);
            res.render("adm");
        }else{
            res.redirect("/login");
        }
    }
}

module.exports = AdmController;
