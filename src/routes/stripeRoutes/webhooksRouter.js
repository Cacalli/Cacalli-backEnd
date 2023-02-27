const { Router } = require("express");
const {
  stripeWebhookEvent,
} = require("../../usecases/stripe");

const routes = Router();

routes.post('/stripe/subscription', async (req, res) => {

  try {
    const body = req.body;
    const signature = req.headers["stripe-signature"];
    const x = await stripeWebhookEvent(body, signature);
    res.status(200);
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message }); 
  }
});

module.exports = routes;