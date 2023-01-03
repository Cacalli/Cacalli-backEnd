const express = require("express");
const app = express();
const config = require("./src/lib/config");

app.use(express.json());

  // Ejecutando el servidor HTTP
app.listen(config.app.port, async () => {
    console.log(`Esuchando peticiones HTTP en el puerto ${config.app.port}`);
  
  });