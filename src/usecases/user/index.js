const express = require("express");

const User = require("../../models/user").model;
const { hashPassword, verifyPassword } = require("../../lib/encrypt");
const { createToken, verifyToken } = require("../../lib/jwt");
const pets = require("./pets");
const subscription = require("./subscription");
const pickupInfo = require("./pickupInfo");
const pickups = require("./pickups");

const routes = express.Router();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const create = async (data) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    street,
    number,
    interior,
    neighborhood,
    municipality,
    state,
    zipCode,
  } = data;
  const address = {
    street,
    number,
    interior,
    neighborhood,
    municipality,
    state,
    zipCode,
  };

  const hash = await hashPassword(password);
  const customer = await stripe.customers.create({
    name: firstName + lastName,
  });

  const customerStripeId = customer.id;

  console.log(customerStripeId);

  const user = new User({
    email,
    password: hash,
    firstName,
    lastName,
    phone,
    address,
    customerStripeId,
  });
  return await user.save();
};

const findById = async (id) => await User.findById(id);

const del = async (id) => await User.findByIdAndDelete(id);

const update = async (id, data) => await User.findByIdAndUpdate(id, data);

const findByEmail = async (email) => await User.findOne({ email });

const authenticate = async (email, password) => {
  const user = await findByEmail(email);
  const hash = user.password;

  const isVerified = await verifyPassword(password, hash);
  if (!isVerified) throw new Error("Wrong password");
  return createToken({ sub: user._id });
};

module.exports = {
  create,
  findById,
  del,
  update,
  authenticate,
  findByEmail,
  pets,
  subscription,
  pickupInfo,
  pickups,
};
