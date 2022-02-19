const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const paymentSchema = new mongoose.Schema({
    periodo: String
},{
    timestamps: true
})

paymentSchema.plugin(findOrCreate);

const Payment = mongoose.model("Payments", paymentSchema);

module.exports = Payment;