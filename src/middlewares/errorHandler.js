const logErrors = (err, req, res, next) => {
  console.log("Something went wrong D:");
  console.error(err);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const { message } = err;
  res.status(500).json({ ok: false, message });
};

module.exports = {
  logErrors,
  errorHandler,
};
