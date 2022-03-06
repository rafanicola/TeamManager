const router = require("express").Router();
const UsersController = require("../controller/UserController");

router.get("/register", UsersController.getRegisterView);
router.post("/register", UsersController.saveNewUser);
router.get("/login", UsersController.getLoginView);
router.post("/login", UsersController.loginUser);
router.post("/logout", UsersController.logoutUser);

module.exports = router;