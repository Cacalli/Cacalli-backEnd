const express = require("express");
const routes = express.Router();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

//create paymentMethod
routes.post("/", async (req, res) => {
  const { type, card } = req.body;
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type,
      card,
    });
    res.status(200).json({ ok: true, payload: paymentMethod });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//retrieve a paymentMethod
routes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(id);
    res.status(200).json({ ok: true, payload: paymentMethod });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//retrieve a customer's payment method
/**Question: On this enpoint how should I receive both ids? (paymentMethodId and customerId)
 * should I receive both from the params
 * should I receive one from the params and the other one from the body
 */
routes.get("/:id/:customerId", async (req, res) => {
  const { id, customerId } = req.params;
  try {
    const paymentMethod = await stripe.customers.retrievePaymentMethod(
      customerId,
      id
    );
    res.status(200).json({ ok: true, payload: paymentMethod });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//update paymntMethod
routes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { billing_details, card, name, email, phone } = req.body;

  try {
    const paymentMethod = await stripe.paymentMethods.update(id, {
      billing_details,
      card,
      name,
      email,
      phone,
    });
    res.status(200).json({ ok: true, payload: paymentMethod });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//list paymentMethods
routes.get("/:customerId", async (req, res) => {
  const { customerId } = req.params;
  const { type } = req.body;
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type,
    });
    res.status(200).json({ ok: true, payload: paymentMethods });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//list a customer PaymentMethods
routes.get("", async (req, res) => {
  try {
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

module.exports = routes;