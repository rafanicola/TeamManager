const Payment = require("../models/Payment");

class PaymentController{

    static accessPaymentPeriodView(req, res){
        
        Payment.find({}, function(err, results){
            if(!err){
                res.render("pagamento", {items: results});
            }else{
                res.send(err);
            }
        });
    }
}

module.exports = PaymentController;