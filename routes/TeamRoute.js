const router = require("express").Router();
//const Team = require("../models/MasterModel");
const TeamController = require("../controller/TeamController");

router.get("/equipes", TeamController.accessTeamView);
// router.post("/", TeamController.addTeam);
// router.post("/delete", TeamController.deleteTeam);

module.exports = router;