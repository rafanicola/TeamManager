const router = require("express").Router();

router.get("/adm", function(req, res){
    res.render("adm");
});

module.exports = router;