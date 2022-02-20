const router = require("express").Router();
const UsersController = require("../controller/UsersController");


router.get("/login", UsersController.getLoginPage);
router.get("/organisation", UsersController.getOrganizationPage);

module.exports = router;