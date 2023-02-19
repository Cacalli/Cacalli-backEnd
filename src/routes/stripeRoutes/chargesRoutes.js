const express = require("express");
const routes = express.Router();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

/**
 * To charge a credit or a debit card, you create a Charge object. You can retrieve and refund individual charges as well as list all charges. Charges are identified by a unique, random ID.
 */

//create a charge
routes.post("/checkout", async (req, res) => {
  const { amount, currency, source, description } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount,
      currency,
      source,
      description,
    });

    if (charge.status === "succeeded") {
      res.status(201).json({
        ok: true,
        message: "charge was successfull",
        payload: charge.id,
      });
    }
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//get charge by id
routes.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const charge = await stripe.charges.retrieve(id);
    res.status(200).json({ ok: true, payload: charge });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//get all charges
routes.get("/", async (req, res) => {
  try {
    const charges = await stripe.charges.list({
      limit: 5,
    });
    res.status(200).json({ ok: true, payload: charges });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//get charges by date
routes.get("/", async (req, res) => {
  const { date } = req.body;
  try {
    const charges = await stripe.charges.search({
      created: date,
    });
    res.status(200).json({ ok: true, payload: charges });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//update charge
routes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { amount, description } = req.body;
  try {
    const charge = await stripe.charges.update(id, { amount, description });
    res.status(200).json({ ok: true, payload: charge });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

module.exports = routes;
