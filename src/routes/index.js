const userRouter = require("./userRouter");
const zoneRouter = require("./zoneRouter");
const packageRouter = require("./packageRouter");

const apiRouter = (app) => {
  app.use("/user", userRouter);
  app.use("/zone", zoneRouter);
  app.use("/package", packageRouter);
};

module.exports = apiRouter;
