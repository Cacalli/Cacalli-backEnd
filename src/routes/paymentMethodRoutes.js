const express = require("express");
const routes = express.Router();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

//create paymentMethod
routes.post("/", async (req, res) => {
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: "4242424242424242",
        exp_month: 8,
        exp_year: 2020,
        cvc: "314",
      },
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
routes.post("", async (req, res) => {});

//list paymentMethods
routes.get("", async (req, res) => {});

//list a customer PaymentMethods
routes.get("", async (req, res) => {});

module.exports = routes;
