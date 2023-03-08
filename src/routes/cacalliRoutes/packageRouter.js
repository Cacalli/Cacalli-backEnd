const { Router } = require("express");
const { getByPeriod, create } = require("../../usecases/package");

const routes = Router();

routes.get("/:period", async (req, res) => {
  const period = parseInt(req.params.period);
  try {
    const payload = await getByPeriod(period);
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(404).json({ ok: false, message });
  }
});

routes.post("/", async (req, res) => {
  const {
    name,
    volume,
    pickupPeriod,
    fullPrice,
    extraPrice,
    initialPrice,
    description,
    picture,
  } = req.body;

  try {
    const payload = await create({
      name,
      volume,
      pickupPeriod,
      fullPrice,
      extraPrice,
      initialPrice,
      description,
      picture,
    });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(404).json({ ok: false, message });
  }
});

module.exports = routes;
