const router = require("express").Router();
const TeamController = require("../controller/TeamController");

router.get("/equipes", TeamController.accessTeamView);
router.post("/equipes", TeamController.addNewTeam);
router.post("/equipes/delete", TeamController.deleteTeam);
router.post("/equipes/edit", TeamController.updateTeam);

module.exports = router;