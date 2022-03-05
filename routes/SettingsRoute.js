const router = require("express").Router();
const SettingsController = require("../controller/SettingsController");

router.get("/configuracoes", SettingsController.getSettingsView);

module.exports = router;