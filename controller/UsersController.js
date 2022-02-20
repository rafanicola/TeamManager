

class UsersController{

    static getLoginPage(req, res){
        res.render("login");
    }
    
    static getOrganizationPage(req, res){
        res.render("organisation");
    }
}

module.exports = UsersController;

