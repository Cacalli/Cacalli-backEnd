require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./src/lib/config");
const db = require("./src/lib/db");
const apiRouter = require("./src/routes/index");
const errorHandler = require("./src/middlewares/errorHandler")

app.use(cors());
app.use((req, res, next) => {
        if (req.originalUrl === '/webhooks/stripe/subscription') {
	next();
	} else {
	express.json()(req, res, next);
	}
    }
);
apiRouter(app);
app.use(errorHandler.logErrors);
app.use(errorHandler.errorHandler);

// Ejecutando el servidor HTTP
app.listen(config.app.port, async () => {
  mongoose.set("strictQuery", false);

  try {
    await db.connect();
    console.log("DB is connected 🤠")

  } catch (err) {
    console.error("Connection refused:", err);
  }

});
