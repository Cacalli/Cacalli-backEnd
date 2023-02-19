require("dotenv").config();

const { APP_PORT, APP_DB_HOST, APP_DB_PASSWORD, APP_DB_USER, APP_SECRET, APP_CONN_STR } =
  process.env;

const config = {
    app: {
      port: APP_PORT || 8001,
      secret: APP_SECRET,
    },
    db: {
        user: APP_DB_USER,
        password: APP_DB_PASSWORD,
        host: APP_DB_HOST,
        conn_string: APP_CONN_STR,
    },
};

module.exports = config;