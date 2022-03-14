const router = require("express").Router();
const PlayerController = require("../controller/PlayerController");


router.get("/atletas", PlayerController.getPlayerView);

module.exports = router;