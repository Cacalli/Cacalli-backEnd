require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./src/lib/config");
const db = require("./src/lib/db");
const apiRouter = require("./src/routes/index");
const errorHandler = require("./src/middlewares/errorHandler");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'cacalli.mx backend API',
    version: '1.0.0',
    description:
      'This API provides support for cacalli.mx website.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'cacalli.mx',
      url: 'https://backend.cacalli.mx',
    },
  },
  components: {
    securitySchemes: {
      Authorization: {
        in: 'header',
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        value: "Beraer <JWT token here >",
      },
    },
  },
  security: [{
    Authorization: [],
  },],
  servers: [
    {
      url: 'http://localhost:8001',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/cacalliRoutes/*.js', './src/routes/stripeRoutes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);


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
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
