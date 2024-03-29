const mongoose = require("mongoose");
const { type } = require("os");
const { Schema } = mongoose;

const schema = new Schema({
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true, unique: true },
  customerStripeId: { type: String, trim: true, unique: true },
  address: {
    street: { type: String, trim: true },
    number: { type: Number },
    interior: Number,
    neighborhood: { type: String },
    municipality: { type: String },
    state: { type: String },
    zipCode: { type: Number },
  },
  subscription: {
    packages: [{ type: mongoose.ObjectId, ref: "Package" }], //This one still needs to be tested with objects id for packages
    status: { type: Number, min: 0, max: 2 }, //State 0 is inactive, 1 is active and 2 is pending payment
    startDate: { type: Date, default: Date.now },
    subscriptionStripeId: { type: String, trim: true },
  },
  pets: [
    {
      petId: { type: Number },
      name: { type: String },
      size: { type: Number, min: 1, max: 5 }, //Sizes are 1:xs, 2:s, 3:m, 4:l, 5:xl
      species: { type: Number, min: 1, max: 3 }, //species are 1:dog, 2:cat, 3:other
    },
  ],
  pickupInfo: {
    time: { type: Number, min: 0, max: 23 },
    day: { type: Number, min: 0, max: 6 },
    zone: { type: mongoose.ObjectId, ref: "Zone" }, //This also needs to be tested with reference to another object
  },
  paymentMethodStripeIds: [{ type: String }],
  role:{type: String, default: 'client'}
});

const model = mongoose.model("User", schema);

module.exports = {
  model,
  schema,
};
