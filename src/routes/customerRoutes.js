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

//retrieve customer
routes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const retrievedCustomer = await stripe.customers.retrieve(id);
    res.status(200).json({ ok: true, payload: retrievedCustomer });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//update customer
routes.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  try {
    const updatedCustomer = await stripe.customers.update(id, {
      name,
      email,
      phone,
      address,
    });
    res.status(200).json({ ok: true, payload: updatedCustomer });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//list all customers
routes.get("/", async (req, res) => {
  try {
    const customers = await stripe.customers.list({
      limit: 3,
    });
    res.status(200).json({ ok: true, payload: customers });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//delete customer
routes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await stripe.customers.del(id);
    res.status(200).json({ ok: true, payload: deleted });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

module.exports = routes;
