const router = require("express").Router();
const UsersController = require("../controller/UserController");

router.get("/register", UsersController.getRegisterView);
router.post("/register", UsersController.saveNewUser);
router.get("/login", UsersController.getLoginView);
router.post("/login", UsersController.loginUser);

router.post("/logout", function(req, res){
    req.logout();
    res.clearCookie("connect.sid");
    res.status(200).redirect("/login")
});

router.get("/home", function(req, res){
    if(req.isAuthenticated()){
        res.render("home");
    }else{
        res.redirect("/login");
    }
})

module.exports = router;