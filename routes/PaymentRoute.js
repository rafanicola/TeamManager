const router = require("express").Router();
//const Payment = require("../models/Payment");
const findOrCreate = require("mongoose-findorcreate");
const PaymentController = require("../controller/PaymentController");

router.get("/", PaymentController.accessPaymentPeriodView);

router.post("/", function(req, res){

    const payPeriod = req.body.periodoPagamento;
    
    Payment.findOrCreate({periodo: payPeriod}, function(err, period, created){
        if(created == false){
            res.send("Item already exists");
        }
        console.log(created)
        res.status(201).redirect("/adm/pagamento")
    });
});
router.post("/periodoPagamento/:id", function(req, res){
    
    Payment.findByIdAndRemove(req.params.id, function(err){
        if(!err){
            res.redirect("/adm/pagamento");
        }else{
            res.send(err);
        }
    })
})

module.exports = router;