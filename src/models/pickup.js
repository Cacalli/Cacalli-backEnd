const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  date: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  status: {type: String}, 
});

const model = mongoose.model("Pickup", schema);
module.exports = { model, schema };
