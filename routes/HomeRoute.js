const router = require("express").Router();
const AdmController = require("../controller/AdmController");


router.get("/adm", AdmController.getAdmRoute);

module.exports = router;