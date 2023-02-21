//Route handler
const userRouter = require("./cacalliRoutes/userRouter");
const zoneRouter = require("./cacalliRoutes/zoneRouter");
const packageRouter = require("./cacalliRoutes/packageRouter");
const chargesRoutes = require("./stripeRoutes/chargesRoutes");
const paymentIntentRoutes = require("./stripeRoutes/paymentIntentsRoutes");
const paymentMethodRoutes = require("./stripeRoutes/paymentMethodRoutes");
const subscriptionRoutes = require("./stripeRoutes/subscriptionRoutes");

const apiRouter = (app) => {
  app.use("/user", userRouter);
  app.use("/zone", zoneRouter);
  app.use("/package", packageRouter);
  app.use("/charges", chargesRoutes);
  app.use("/paymentIntents", paymentIntentRoutes);
  app.use("/paymentMethod", paymentMethodRoutes);
  app.use("/subscriptions", subscriptionRoutes);
};

module.exports = apiRouter;
