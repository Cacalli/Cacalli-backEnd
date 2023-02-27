const { Router } = require("express");
const bodyParser = require('body-parser');
const {
  stripeWebhookEvent,
} = require("../../usecases/stripe");

const routes = Router();

routes.post('/stripe/subscription', bodyParser.raw({type: 'application/json'}), async (req, res) => {
  try {
    const body = req.body;
    const signature = req.headers["stripe-signature"];
    const payload = await stripeWebhookEvent(body, signature);
    res.status(200).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message }); 
  }
});

module.exports = routes;
