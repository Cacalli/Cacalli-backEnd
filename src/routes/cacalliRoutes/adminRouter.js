const { Router } = require("express");
const { getClients } = require("../../usecases/user");
const { authHandler, authAdminHandler } = require ("../../middlewares/authHandler");

const routes = Router();

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Checks if the specified zipcode has service available
 *     tags: 
 *       - admin
 *     description: 
 *     parameters:
 *         - in: query
 *           name: zone
 *           description: 
 *           schema:
 *             type: string
 *     responses:
 *       200:
 *         description: A boolean variable indicating if there are any zones that include that zipcode.          
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: boolean
 *                   description: The availability of a zone that includes de zipcode
 *                   example: false
 */
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
