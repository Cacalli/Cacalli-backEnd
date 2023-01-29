const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  date: { type: Date, required: true },
  //temporary workoaround to validate
  user: { type: [Schema.Types.ObjectId], ref: "User" },
  status: {type: Number, min: 1, max: 5}, 
});

const model = mongoose.model("Pickup", schema);
module.exports = { model, schema };
