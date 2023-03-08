const { Router } = require("express");
const { getAllClients } = require("../../usecases/user");
const { authHandler, authAdminHandler } = require ("../../middlewares/authHandler");

const routes = Router();

routes.get("/users", authHandler, authAdminHandler, async (req, res) => {
    const userRole = req.params.token.role;
    try {
      const payload = await getAllClients(userRole);
      res.status(202).json({ ok: true, payload });
    } catch (error) {
      const { message } = error;
      res.status(401).json({ ok: false, message });
    }
  });

module.exports = routes;
