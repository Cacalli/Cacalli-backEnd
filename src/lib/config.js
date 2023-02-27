require("dotenv").config();

const { APP_PORT, APP_DB_HOST, APP_DB_PASSWORD, APP_DB_USER, APP_SECRET, APP_CONN_STR, STRIPE_SUBSCRIPTION_WEBHOOK_SINGING_SECRET, STRIPE_PRIVATE_KEY } =
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
    stripe: {
      privateKey: STRIPE_PRIVATE_KEY,
      subscriptionWebhookSigningSecret: STRIPE_SUBSCRIPTION_WEBHOOK_SINGING_SECRET,
    },
};

module.exports = config;