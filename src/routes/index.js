//Route handler
const { app } = require("../lib/config");
const paymentRoutes = require("./paymentRoutes");
const apiRouter = () => {
  app.use("payments", paymentRoutes);
};

module.exports = apiRouter;
