const mongoose = require("mongoose");
<<<<<<< HEAD
const { Schema } = mongoose;

const schema = new Schema({
  date: { type: Date, required: true },
  //temporary workoaround to validate
  user: { type: [Schema.Types.ObjectId], ref: "User" },
=======

const schema = new Schema({
date:{type: Date, required: true },
//temporary workoaround to validate
user:{type: [Schema.Types.ObjectId], ref:"User"}
>>>>>>> BE-06-1user_usecases
});

const model = mongoose.model("Pickup", schema);
module.exports = { model, schema };
