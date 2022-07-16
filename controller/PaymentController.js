//const Payment = require("../models/Payment");

class PaymentController{

    static getPaymentsView(req, res){
        if(req.isAuthenticated()){
            res.render("pagamentos");
        }else{
            res.redirect("/login");
        }
        
    }
}

module.exports = PaymentController;