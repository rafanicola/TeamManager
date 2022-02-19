const router = require("express").Router();
const Athlete = require("../models/MasterModel");
const Team = require("../models/MasterModel");
const PlayerTeam = require("../models/MasterModel");
const AthleteController = require("../controller/AthleteController")

router.get("/", AthleteController.accessAthleteView);
router.post("/", AthleteController.addAthlete);
router.post("/delete", AthleteController.deleteAthtlete);
router.get("/playerdesc/:id", AthleteController.showAthleteInformation);
router.post("/playerdesc/:id", AthleteController.associatePlayerAndTeam);

module.exports = router;