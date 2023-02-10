//Route handler
const chargesRoutes = require("./chargesRoutes");
const paymentIntentRoutes = require("./paymentIntentsRoutes");

const apiRouter = (app) => {
  app.use("/charges", chargesRoutes);
  app.use("/paymentIntents", paymentIntentRoutes);
};

module.exports = apiRouter;
