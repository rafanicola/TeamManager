const router = require("express").Router();
const UsersController = require("../controller/UsersController");


router.get("/login", UsersController.getLoginPage);

module.exports = router;