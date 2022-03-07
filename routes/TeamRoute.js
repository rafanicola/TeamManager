const router = require("express").Router();
//const Team = require("../models/MasterModel");
const TeamController = require("../controller/TeamController");

router.get("/equipes", TeamController.accessTeamView);
router.post("/equipes", TeamController.addNewTeam);
// router.post("/delete", TeamController.deleteTeam);

module.exports = router;