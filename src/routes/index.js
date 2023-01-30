//Route handler
const paymentRoutes = require("./paymentRoutes");

const apiRouter = (app) => {
  app.use("/payments", paymentRoutes);
};

module.exports = apiRouter;
