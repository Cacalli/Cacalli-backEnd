const { Router } = require("express");
const { checkZipcode, schedules } = require("../../usecases/zone");

const routes = Router();

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

routes.get("/daysAvailable", async (req, res) => {
  const { zipCode } = req.body;

  try {
    const payload = await schedules.getDaysAvailable({ zipCode });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

routes.get("/schedulesAvailable", async (req, res) => {
  const { zipCode, day } = req.body;
  console.log('dia',day);
  try {
    const payload = await schedules.getSchedulesAvailable({ zipCode, day });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

module.exports = routes;
