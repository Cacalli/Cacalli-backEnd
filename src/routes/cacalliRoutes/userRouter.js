const { Router } = require("express");
const {
  create,
  authenticate,
  findById,
  pets,
  subscription,
  pickups,
  complete,
} = require("../../usecases/user");
const { authHandler } = require("../../middlewares/authHandler");

const routes = Router();

routes.post("/", async (req, res) => {
  const { email, password, firstName, phone } = req.body;

  try {
    const payload = await create({
      email,
      password,
      firstName,
      phone,
    });

    const { token } = await authenticate(email, password);

    const payloadModfied = {
      email: payload.email,
      firstName: payload.firstName,
      phone: payload.phone,
      token,
    };
    res.json({ ok: true, payload: payloadModfied });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

routes.put("/complete", authHandler, async (req, res) => {
  let {
    street,
    number,
    interior,
    neighborhood,
    municipality,
    state,
    zipcode,
    time,
    day,
    zone,
  } = req.body;
  number = parseInt(number);
  interior = parseInt(interior);
  zipcode = parseInt(zipcode);
  const address = {
    street,
    number,
    interior,
    neighborhood,
    municipality,
    state,
    zipcode,
  };
  const pickupInfo = { time, day, zone };
  const userId = req.params.token.sub;
  try {
    const payload = await complete(userId, { address, pickupInfo });
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: true, message });
  }
});

routes.get("/", authHandler, async (req, res) => {
  const userId = req.params.token.sub;
  try {
    const payload = await findById(userId);
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

routes.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authenticate(email, password);
    res
      .status(202)
      .json({ ok: true, payload: result.token, role: result.role });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

routes.post("/pet", authHandler, async (req, res) => {
  const userId = req.params.token.sub;
  const { name, size, species } = req.body;

  try {
    const payload = await pets.addPet({ userId, name, size, species });
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

routes.delete("/pet", authHandler, async (req, res) => {
  const userId = req.params.token.sub;
  const { name } = req.body;

  try {
    const payload = await pets.delPet({ userId, name });
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

routes.get("/allPets", authHandler, async (req, res) => {
  const userId = req.params.token.sub;

  try {
    const payload = await pets.getAllPets({ userId });
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

routes.get("/nextPickup", authHandler, async (req, res) => {
  const userId = req.params.token.sub;

  try {
    const payload = await pickups.getNextPickup(userId);
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

routes.post("/subscription", authHandler, async (req, res) => {
  const userId = req.params.token.sub;
  const body = req.body;

  try {
    const payload = await subscription.createStripeCheckoutSession({
      userId,
      body,
    });
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

module.exports = routes;
