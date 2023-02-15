const express = require("express");
const routes = express.Router();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

//create a customer
routes.post("/", async (req, res) => {
  const { name, email, phone, /*payment_method,*/ address } = req.body;
  try {
    const customer = await stripe.customers.create({
      name,
      email,
      phone,
      //payment_method,
      address,
      description:
        "My First Test Customer (created for API docs at https://www.stripe.com/docs/api)",
    });
    res.status(201).json({ ok: true, payload: customer });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

module.exports = routes;
