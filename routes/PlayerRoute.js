const router = require("express").Router();
const PlayerController = require("../controller/PlayerController");

router.get("/atletas", PlayerController.getPlayerView);
router.post("/atletas", PlayerController.addNewPlayer);
router.post("/atletas/delete", PlayerController.deletePlayer);
router.get("/atletas/playerdesc/:id", PlayerController.getPlayerDescriptionView);
router.post("/atletas/playerdesc", PlayerController.savePlayerTeamAssociation);
router.post("/atletas/playerdesc/deleteAssociation", PlayerController.deletePlayerAssociation)


module.exports = router;