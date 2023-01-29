const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    name: { type: String, required: true, trim: true},
    zipCodes: [Number], 
    schedules: [{
        day: {type: Number, min: 1, max: 7},
        time: {type: Number, min: 1, max: 4}
    }],
});

const model = mongoose.model("Zone", schema);

module.exports = {
    model, 
    schema,
};