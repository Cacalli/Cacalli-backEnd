//Route handler
const chargesRoutes = require("./chargesRoutes");
const paymentIntentRoutes = require("./paymentIntentsRoutes");
const customerRoutes = require("./customerRoutes");
const subscriptionRoutes = require("./subscriptionRoutes");

const apiRouter = (app) => {
  app.use("/charges", chargesRoutes);
  app.use("/paymentIntents", paymentIntentRoutes);
  app.use("/customers", customerRoutes);
  app.use("/subscriptions", subscriptionRoutes);
};

module.exports = apiRouter;
