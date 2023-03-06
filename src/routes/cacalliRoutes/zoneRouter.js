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

routes.get("/schedulesAvailable/:zipcode/:day", async (req, res) => {
  const { zipcode, day } = req.params;
  console.log('dia',day);
  try {
    const payload = await schedules.getSchedulesAvailable({ zipcode, day });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

module.exports = routes;
