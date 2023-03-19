const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  userId: { type: mongoose.ObjectId, ref: "User"},
  creationDate: Date,
});

const model = mongoose.model("Package", schema);

module.exports = {
  model,
  schema,
};
