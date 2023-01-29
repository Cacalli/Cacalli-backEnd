const userRouter = require("./userRouter");
const packageRouter = require("./packageRouter");
const paymentRouter = require("./paymentRouter");

const apiRouter = (app) => {
  app.use("/user", userRouter);
  app.use("/package", packageRouter);
  app.use("/payment", paymentRouter);
};

module.exports = apiRouter;
