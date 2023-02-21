const { Router } = require("express");
const {
  create,
  authenticate,
  findById,
  pets,
  subscription,
  pickups,
  addPaymentMethod,
} = require("../../usecases/user");
const { authHandler } = require("../../middlewares/authHandler");

const routes = Router();

routes.post("/", async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    street,
    number,
    interior,
    neighborhood,
    municipality,
    state,
    zipCode,
  } = req.body;

  try {
    const payload = await create({
      email,
      password,
      firstName,
      lastName,
      phone,
      street,
      number,
      interior,
      neighborhood,
      municipality,
      state,
      zipCode,
    });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
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
    const payload = await authenticate(email, password);
    res.status(202).json({ ok: true, payload });
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

routes.get("/totalFee", authHandler, async (req, res) => {
  const userId = req.params.token.sub;

  try {
    const payload = await subscription.calcTotalFee({ userId });
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

routes.get("/initialFee", authHandler, async (req, res) => {
  const userId = req.params.token.sub;

  try {
    const payload = await subscription.calcInitialFee({ userId });
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

routes.post("/package", authHandler, async (req, res) => {
  const userId = req.params.token.sub;
  const { packageId } = req.body;

  try {
    const payload = await subscription.addPackage({
      userId,
      package: packageId,
    });
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

routes.delete("/package", authHandler, async (req, res) => {
  const userId = req.params.token.sub;
  const { packageId } = req.body;

  try {
    const payload = await subscription.removePackage({
      userId,
      package: packageId,
    });
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

routes.get("/allPackages", authHandler, async (req, res) => {
  const userId = req.params.token.sub;

  try {
    const payload = await subscription.getAllPackages({ userId });
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

routes.post("/paymentMethod", authHandler, async (req, res) => {
  const userId = req.params.token.sub;
  const { paymentMethodId } = req.body;

  try {
    const payload = await addPaymentMethod({
      userId,
      paymentMethodId,
    });
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

module.exports = routes;
