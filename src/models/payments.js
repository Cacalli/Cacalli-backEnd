const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  amount: { type: Number, required: true },
  payment_status: { type: String, required: true },
  date: { type: Date, required: true },
  suscription: {
    packages: [{ type: mongoose.ObjectId, ref: "Package" }], //This one still needs to be tested with objects id for packages
    status: { type: Number, min: 0, max: 2 }, //State 0 is inactive, 1 is active and 2 is pending payment
    startDate: { type: Date, default: Date.now },
  },
});

const model = mongoose.model("Payment", schema);

module.exports = { model, schema };
