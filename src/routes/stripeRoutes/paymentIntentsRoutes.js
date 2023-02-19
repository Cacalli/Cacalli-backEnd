const express = require("express");
const routes = express.Router();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

//create a paymentIntent
routes.post("/paymentIntent", async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });
    if (paymentIntent.status === "requires_payment_method") {
      res.status(201).json({
        ok: true,
        message: "paymentIntent in process",
        payload: paymentIntent,
      });
    }
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//retrieve a paymentIntent
routes.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    res.status(200).json({
      ok: true,
      message: "paymentIntent retrieved",
      payload: paymentIntent,
    });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//update a paymentIntent
routes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { amount, description } = req.body;

  try {
    const paymentIntentUpdated = await stripe.paymentIntents.update(id, {
      //metadata: { order_id: "6735" },
      amount,
      description,
    });
    res.status(200).json({ ok: true, payload: paymentIntentUpdated });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//cancel a paymentIntent
routes.post("/:id/cancel", async (req, res) => {
  const { id } = req.params;
  try {
    const paymentIntentCanceled = await stripe.paymentIntents.cancel(id);
    if (paymentIntentCanceled.status === "canceled") {
      res.status(201).json({ ok: true, payload: paymentIntentCanceled });
    }
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: true, message });
  }
});

//list all paymentsIntents
routes.get("/", async (req, res) => {
  try {
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 3,
    });
    res.status(200).json({ ok: true, payload: paymentIntents });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: true, message });
  }
});

//confirm pamentIntent
routes.post("/:id/confirm", async (req, res) => {
  const { id } = req.params;
  try {
    const paymentIntentConfirm = await stripe.paymentIntents.confirm(id, {
      payment_method: "pm_card_visa",
    });
    if (paymentIntentConfirm.status === "succeeded") {
      res.status(200).json({ ok: true, payload: paymentIntentConfirm });
    }
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: true, message });
  }
});

module.exports = routes;
