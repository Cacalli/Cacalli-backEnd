const { Router } = require("express");
const { getClients } = require("../../usecases/user");
const { authHandler, authAdminHandler } = require ("../../middlewares/authHandler");

const routes = Router();

routes.get("/users", authHandler, authAdminHandler, async (req, res) => {
    const { zone, day, time, status } = req.query;
    try {
      const payload = await getClients({ zone, day, time, status });
      res.status(202).json({ ok: true, payload });
    } catch (error) {
      const { message } = error;
      res.status(401).json({ ok: false, message });
    }
  });

module.exports = routes;
