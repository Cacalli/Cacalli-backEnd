const { Router } = require("express");
const { findByEmail, getClients, pickups } = require("../../usecases/user");
const { getAvailableCombos } = require("../../usecases/zone");
const { updateForToday } = require("../../usecases/pickup");
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
 *         - in: query
 *           name: day
 *           schema:
 *             type: string
 *         - in: query
 *           name: time
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
    await updateForToday()
    const { zone, day, time, status } = req.query;
    try {
      const payload = await getClients({ zone, day, time, status });
      res.status(202).json({ ok: true, payload });
    } catch (error) {
      const { message } = error;
      res.status(401).json({ ok: false, message });
    }
  });

/**
 * @swagger
 * /admin/zoneFilters:
 *   get:
 *     summary: 
 *     tags: 
 *       - admin
 *     description: 
 *     parameters:
 *         - in: query
 *           name: zone
 *           description: 
 *           schema:
 *             type: string
 *         - in: query
 *           name: day
 *           schema:
 *             type: string
 *         - in: query
 *           name: time
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
routes.get("/zoneFilters", authHandler, authAdminHandler, async (req, res) => {
  const { zone, day, time } = req.query;
  try {
    const payload = await getAvailableCombos({ zone, day, time });
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

/**
 * @swagger
 * /admin/pickup/complete:
 *   put:
 *     summary: 
 *     tags: 
 *       - admin
 *     description: 
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *                 example: diego.vignau.manjarrez@gmail.com
 *              
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
routes.put("/pickup/complete", authHandler, authAdminHandler, async (req, res) => {
  const { userEmail } = req.body;
  const user = await findByEmail(userEmail);
  const userId = user.id;
    try {
      const payload = await pickups.completePickup(userId);
      res.status(202).json({ ok: true, payload });
    } catch (error) {
      const { message } = error;
      res.status(404).json({ ok: false, message });
    }
});

module.exports = routes;
