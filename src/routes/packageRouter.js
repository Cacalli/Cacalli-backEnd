const { Router } = require("express");
const routes = Router();

const {
    getAllPackages,
} = require("../usecases/package/index");

routes.get("/", async (req, res) => {
    try {
      const payload = await getAllPackages();
      res.json({ ok: true, payload });
    } catch (error) {
      const { message } = error;
      res.status(404).json({ ok: false, message });
    }
  });
  
