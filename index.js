const express = require("express");
const app = express();
const config = require("./src/lib/config");
const db = require("./src/lib/db");

const User = require("./src/models/user").model;
const Pickup= require("./src/models/pickup").model;


app.use(express.json());

  // Ejecutando el servidor HTTP
app.listen(config.app.port, async () => {
  console.log(`Esuchando peticiones HTTP en el puerto ${config.app.port}`);

  try {
    await db.connect();
    console.log("DB is connected 🤠");
  } catch (err) {
    console.error("Connection refused:", err);
  }
  const user = new User({email:'diegovm', password:'asdf', firstName:'Diego', lastName:'Viganu', phone: '12', address: {street: "pdte", number:1, interior:1, neighborhood: "coyovia", municipality: "coyo", state:"cdmx", zipCode:4000}, suscription: {packages:['asdf']},});
  const status = await user.save();
  console.log(status, "este es el estado")
});