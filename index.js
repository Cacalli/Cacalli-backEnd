const express = require("express");
const app = express();
const apiRouter = require("./src/routes");
const config = require("./src/lib/config");
const db = require("./src/lib/db");

app.use(express.json());
apiRouter(app);

// Ejecutando el servidor HTTP
app.listen(config.app.port, async () => {
  console.log(`Esuchando peticiones HTTP en el puerto ${config.app.port}`);
  
  try {
    await db.connect();
    console.log("DB is connected 🤠")

  } catch (err) {
    console.error("Connection refused:", err);
  }
});
