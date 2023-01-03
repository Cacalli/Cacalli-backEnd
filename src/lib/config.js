
const { APP_PORT, } =
  process.env;

const config = {
    app: {
      port: APP_PORT || 8001,
    },
};

module.exports = config;