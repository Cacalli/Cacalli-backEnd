const { Router } = require("express");
const { create, checkZipcode, schedules, zipcodes } = require("../../usecases/zone");
const { authHandler, authAdminHandler } = require ("../../middlewares/authHandler");

const routes = Router();

/**
 * @swagger
 * /zone/checkZipcode/{zipcode}:
 *   get:
 *     summary: Checks if the specified zipcode has service available
 *     tags: 
 *       - zone
 *     description: 
 *     parameters:
 *         - in: path
 *           name: zipcode
 *           required: true
 *           description: zipcode to be searched
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
routes.get("/checkZipcode/:zipcode", async (req, res) => {
  const { zipcode } = req.params;

  try {
    const payload = await checkZipcode({ zipcode });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

/**
 * @swagger
 * /zone/daysAvailable/{zipcode}:
 *   get:
 *     summary: checks the available days for pickup for a given zipcode
 *     tags:
 *       - zone
 *     description: 
 *     parameters:
 *         - in: path
 *           name: zipcode
 *           required: true
 *           description: zipcode to be searched
 *           schema:
 *             type: string
 *     responses:
 *       200:
 *         description: An array of all available days for pickup       
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: array
 *                   items: 
 *                     type: string
 *                     description: Days when there is a pickup schedule available for a certain zipcode
 *                     example: Lunes
 */
routes.get("/daysAvailable/:zipcode", async (req, res) => {
  const { zipcode } = req.params;

  try {
    const payload = await schedules.getDaysAvailable({ zipcode });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

/**
 * @swagger
 * /zone/schedulesAvailable/{zipcode}/{day}:
 *   get:
 *     summary: checks the available days for pickup for a given zipcode
 *     tags:
 *       - zone
 *     description: 
 *     parameters:
 *         - in: path
 *           name: zipcode
 *           required: true
 *           description: zipcode to be searched
 *           type: string
 *         - in: path
 *           name: day
 *           required: true
 *           description: day to be searched
 *           type: string
 *     responses:
 *       200:
 *         description: An array of all available days for pickup       
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: array
 *                   items: 
 *                     type: string
 *                     description: Days when there is a pickup schedule available for a certain zipcode
 *                     example: 8:00-11:00
 */
routes.get("/schedulesAvailable/:zipcode/:day", async (req, res) => {
  const { zipcode, day } = req.params;
  try {
    const payload = await schedules.getSchedulesAvailable({ zipcode, day });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

/**
 * @swagger
 * /zone/{name}:
 *   post:
 *     summary: create a new zone for pickups
 *     tags: 
 *       - zone
 *     description: 
 *     parameters:
 *         - in: path
 *           name: name
 *           required: true
 *           description: name of a new zone
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the name of the newly created zone
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: string
 *                   description: Name of the zone
 *                   example: Coyoacan-1
 */
routes.post("/:name", authHandler, authAdminHandler, async (req, res) => {
  const { name } = req.params;
  try {
    const payload = await create({ name });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

/**
 * @swagger
 * /zone/{name}/zipcode/{zipcode}:
 *   post:
 *     summary: adds a new zipcode to an existing zone
 *     tags:
 *       - zone
 *     description: 
 *     parameters:
 *         - in: path
 *           name: name
 *           required: true
 *           description: name of a zone
 *           type: string
 *         - in: path
 *           name: zipcode
 *           required: true
 *           description: zipcode to be added
 *     responses:
 *       200:
 *         description: Returns the zipcode that was added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: string
 *                   description: New zipcode
 *                   example: 4000
 */
routes.post("/:name/zipcode/:zipcode", authHandler, authAdminHandler, async (req, res) => {
  const { name, zipcode } = req.params;
  try {
    const payload = await zipcodes.addZipcode({ name, zipcode });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

/**
 * @swagger
 * /zone/{name}/zipcode:
 *   get:
 *     summary: gets all zipcodes for a zone
 *     tags:
 *       - zone
 *     description: 
 *     parameters:
 *         - in: path
 *           name: name
 *           required: true
 *           description: name of a zone
 *           type: string
 *     responses:
 *       200:
 *         description: Returns all zipcodes available for a zone
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: Avaialbe zipcode for a zone
 *                     example: 4000
 */
routes.get("/:name/zipcode", authHandler, authAdminHandler, async (req, res) => {
  const { name } = req.params;
  try {
    const payload = await zipcodes.getZipcodes({ name });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

/**
 * @swagger
 * /zone/{name}/zipcode/{zipcode}:
 *   delete:
 *     summary: deletes a zipcode from a zone
 *     tags: 
 *       - zone
 *     description: 
 *     parameters:
 *         - in: path
 *           name: name
 *           required: true
 *           description: name of a zone
 *           type: string
 *         - in: path
 *           name: zipcode
 *           required: true
 *           description:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns deleted zipcode
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: string
 *                   description: Deleted zipcode
 *                   example: 4000
 */
routes.delete("/:name/zipcode/:zipcode", authHandler, authAdminHandler, async (req, res) => {
  const { name, zipcode } = req.params;
  try {
    const payload = await zipcodes.delZipcode({ name, zipcode });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

/**
 * @swagger
 * /zone/{name}/schedule/{day}/{time}:
 *   post:
 *     summary: adds a new schedule to an existing zone
 *     tags: 
 *       - zone
 *     description: 
 *     parameters:
 *         - in: path
 *           name: name
 *           required: true
 *           description: name of a zone
 *           type: string
 *         - in: path
 *           name: day
 *           required: true
 *           description: day of schedule
 *         - in: path
 *           name: time
 *           required: true
 *           type: string
 *           description: time of schedule
 *     responses:
 *       200:
 *         description: Returns the new schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: object
 *                   properties:
 *                     day: 
 *                       type: string
 *                       description: Day of new schedule
 *                       example: Lunes
 *                     time: 
 *                       type: string
 *                       description: Time of new schedule
 *                       example: 8:00-11:00
 */
routes.post("/:name/schedule/:day/:time", authHandler, authAdminHandler, async (req, res) => {
  const { name, day, time } = req.params;
  try {
    const payload = await schedules.addSchedule({ name, day, time });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

/**
 * @swagger
 * /zone/{name}/schedule:
 *   get:
 *     summary: gets all schedules for a zone
 *     tags: 
 *       - zone
 *     description: 
 *     parameters:
 *         - in: path
 *           name: name
 *           required: true
 *           description: name of a zone
 *           type: string
 *     responses:
 *       200:
 *         description: Returns all schedules available for a zone
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: string
 *                         description: Avaialbe day for a zone
 *                         example: Lunes
 *                       time: 
 *                         type: string
 *                         description: Available time for a day and zone
 *                         example: 8:00-13:00
 */
routes.get("/:name/schedule", authHandler, authAdminHandler, async (req, res) => {
  const { name } = req.params;
  try {
    const payload = await schedules.getSchedules({ name });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

/**
 * @swagger
 * /zone/{name}/schedule/{day}/{time}:
 *   delete:
 *     summary: deletes a schedule from a zone
 *     tags: 
 *       - zone
 *     description: 
 *     parameters:
 *         - in: path
 *           name: name
 *           required: true
 *           description: name of a zone
 *           type: string
 *         - in: path
 *           name: day
 *           required: true
 *           description:
 *           type: string
 *         - in: path
 *           name: time
 *           required: true
 *           type: string
 *     responses:
 *       200:
 *         description: Returns deleted zipcode
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                       description: 
 *                       example:
 *                     time: 
 *                       type: string
 *                       description: 
 *                       example: 
 */
routes.delete("/:name/schedule/:day/:time", authHandler, authAdminHandler, async (req, res) => {
  const { name, day, time } = req.params;
  try {
    const payload = await schedules.delSchedule({ name, day, time });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

module.exports = routes;