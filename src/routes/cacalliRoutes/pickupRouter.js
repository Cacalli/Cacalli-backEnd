const express = require("express");
const routes = express.Router();

const {
  create,
  getAllPickups,
  getAllPickupsByUser,
  updatePickup,
  deletePickup,
} = require("../../usecases/pickup");

routes.get("/", async (req, res) => {
  try {
    const pickup = await getAllPickups();
    res.json({ ok: true, payload: pickup });
  } catch (error) {
    res.status(400).json({ ok: false, message: error });
  }
});

routes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { user, date } = await getAllPickupsByUser(id);
    res.json({ ok: true, payload: { user, date } });
  } catch (error) {
    res.status(417).json({ ok: false, message: error });
  }
});

routes.post("/", async (req, res) => {
  const { newDate } = req.body;

  try {
    const payload = await create(newDate);
    res.json({
      ok: true,
      message: "You selected your pickup date",
      payload,
    });
  } catch (error) {
    res.status(405).json({
      ok: false,
      message: error,
    });
  }
});

routes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { user, date } = req.body;

  try {
    const modifierDate = { user, date };
    const newDate = await updatePickup(id, modifierDate);
    res.json({ ok: true, payload: newDate });
  } catch (error) {
    res.status(204).json({
      ok: false,
      message: error,
    });
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user, date } = await deletePickup(id);

    res.json({ ok: true, payload: { user, date } });
  } catch (error) {
    res.status(444).json({
      ok: false,
      message: error,
    });
  }
});

module.exports = routes;
