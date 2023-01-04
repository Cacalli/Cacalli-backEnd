const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    name: { type: String, required: true, trim: true},
    zipCodes: [Number], 
    schedules: [Number],
});

const model = mongoose.model("Zone", schema);

module.exports = {
    model, 
    schema,
};