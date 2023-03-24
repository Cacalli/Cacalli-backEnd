const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  userId: { type: mongoose.ObjectId, ref: "User"},
  creationDate: Date,
  total: Number,
  status: String,
  paymentMethod: { type: String, default: "stripe"},
  period: {
    start: Date,
    end: Date,
  },
  pdf: String,
  paymentStripeId: String,
});

const model = mongoose.model("Invoice", schema);

module.exports = {
  model,
  schema,
};
