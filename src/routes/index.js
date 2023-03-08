//Route handler
const userRouter = require("./cacalliRoutes/userRouter");
const zoneRouter = require("./cacalliRoutes/zoneRouter");
const packageRouter = require("./cacalliRoutes/packageRouter");
const adminRouter = require("./cacalliRoutes/adminRouter");
const webhooksRouter = require("./stripeRoutes/webhooksRouter");

const apiRouter = (app) => {
  app.use("/user", userRouter);
  app.use("/zone", zoneRouter);
  app.use("/package", packageRouter);
  app.use("/admin", adminRouter);
  app.use("/webhooks", webhooksRouter);
};

module.exports = apiRouter;
