const { Router } = require("express");
const { getByPeriod } = require("../usecases/package");

const routes = Router();

routes.get("/", async (req, res) => {
    const period = parseInt(req.query.period);
    try {
      const payload = await getByPeriod(period);
      res.json({ ok: true, payload });
    } catch (error) {
      const { message } = error;
      res.status(404).json({ ok: false, message });
    }
  });
  
module.exports = routes;