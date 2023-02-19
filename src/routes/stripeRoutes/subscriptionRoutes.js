const express = require("express");
const routes = express.Router();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

module.exports = routes;
