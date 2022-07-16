const router = require("express").Router();
const PaymentController= require("../controller/PaymentController");

router.get("/pagamento", PaymentController.getPaymentsView);


module.exports = router;