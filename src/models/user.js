const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    phone: {type: String, required: true, trim: true, unique: true },
    address: { 
        street: {type: String, required: true, trim: true},
        number: {type: Number, required: true},
        interior: Number,
        neighborhood: {type: String, required: true},
        municipality: {type: String, required: true},
        state: {type: String, required: true},
        zipCode: {type: Number, required: true},
    },
    suscription: {
        packages: [{type: mongoose.ObjectId, ref: "Package"}], //This one still needs to be tested with objects id for packages
        status: {type: Number, min: 0, max: 2}, //State 0 is inactive, 1 is active and 2 is pending payment
        startDate: {type: Date, default: Date.now },
    },
    pets: [{
        pet_id: {type: Number},
        name: {type: String},
        size: {type: Number, min:1, max:5}, //Sizes are 1:xs, 2:s, 3:m, 4:l, 5:xl
        species: {type: Number, min:1, max:3}, //species are 1:dog, 2:cat, 3:other
    }],
    RecolectionInfo: {
        time: {type: Number, min: 0, max: 23},
        day: {type: Number, min: 1, max: 7},
        zone: Number, //This also needs to be tested with reference to another object
        last: Number, //Also needs to be tested
        status: Number, // 0: on time, 1: late
    },
});

const model = mongoose.model("User", schema);

module.exports = {
    model, 
    schema,
};