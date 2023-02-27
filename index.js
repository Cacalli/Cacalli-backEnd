require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./src/lib/config");
const db = require("./src/lib/db");
const apiRouter = require("./src/routes/index");

const User = require("./src/models/user").model;
const Pickup = require("./src/models/pickup").model;

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

// Ejecutando el servidor HTTP
app.listen(config.app.port, async () => {
  mongoose.set("strictQuery", false);

  try {
    await db.connect();
    console.log("DB is connected 🤠")

  } catch (err) {
    console.error("Connection refused:", err);
  }

  // const user = new User({
  //   email: "diegovm",
  //   password: "asdf",
  //   firstName: "Diego",
  //   lastName: "Viganu",
  //   phone: "12",
  //   address: {
  //     street: "pdte",
  //     number: 1,
  //     interior: 1,
  //     neighborhood: "coyovia",
  //     municipality: "coyo",
  //     state: "cdmx",
  //     zipCode: 4000,
  //   },
  //   suscription: { packages: ["63b79cb32e143062e61f0fd8"] },
  // });
  // const status = await user.save();
  // console.log(status, "este es el estado");
});
