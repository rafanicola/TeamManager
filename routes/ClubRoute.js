const ClubController = require("../controller/ClubController");

const router = require("express").Router();

router.post("/club", ClubController.saveNewClub);

module.exports = router;