const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  concept: String,
  amount: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  user: { type: [Schema.Types.ObjectId], ref: "User" },
});


// const model = mongoose.model("Payment", schema);

// module.exports = { model, schema };
