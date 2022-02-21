const router = require("express").Router();
const UsersController = require("../controller/UserController");


router.get("/login", UsersController.getLoginPage);
router.get("/organisation", UsersController.getOrganizationPage);

module.exports = router;