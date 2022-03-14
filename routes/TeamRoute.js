const router = require("express").Router();
//const Team = require("../models/MasterModel");
const TeamController = require("../controller/TeamController");

router.get("/equipes", TeamController.accessTeamView);
router.post("/equipes", TeamController.addNewTeam);
router.post("/equipes/delete", TeamController.deleteTeam);
router.post("/equipes/edit", TeamController.editTeam);


module.exports = router;