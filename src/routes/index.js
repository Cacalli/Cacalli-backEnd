//Route handler
const chargesRoutes = require("./chargesRoutes");
const paymentIntentRoutes = require("./paymentIntentsRoutes");
const paymentMethodRoutes = require("./paymentMethodRoutes");
const customerRoutes = require("./customerRoutes");
const subscriptionRoutes = require("./subscriptionRoutes");

const apiRouter = (app) => {
  app.use("/charges", chargesRoutes);
  app.use("/paymentIntents", paymentIntentRoutes);
  app.use("/paymentMethod", paymentMethodRoutes);
  app.use("/customers", customerRoutes);
  app.use("/subscriptions", subscriptionRoutes);
};

module.exports = apiRouter;
