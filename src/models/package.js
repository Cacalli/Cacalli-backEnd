const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    name: { type: String, required: true, trim: true},
    volume: Number, 
    recolectionPeriod: {type: Number, min: 1, max: 2},
    fullPrice: Number,
    extraPrice: Number,
    description: String,
});

const model = mongoose.model("Package", schema);

module.exports = {
    model, 
    schema,
};