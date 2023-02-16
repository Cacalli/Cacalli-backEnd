const { Router } = require("express");
const { checkZipCode } = require("../usecases/zone");

const routes = Router();

routes.get("/checkZipCode", async (req, res) => {
    const {zipCode} = req.body;

    try {
        const payload = await checkZipCode({zipCode});
        res.json({ ok: true, payload });
    } catch (error) {
        const { message } = error;
        res.status(400).json({ ok: false, message });
    }
});

module.exports = routes;