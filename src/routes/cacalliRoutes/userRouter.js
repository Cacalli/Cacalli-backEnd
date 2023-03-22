const { Router } = require("express");
const {
  create,
  authenticate,
  pets,
  subscription,
  pickups,
  complete,
  getUserInfo,
} = require("../../usecases/user");
const { authHandler } = require("../../middlewares/authHandler");

const routes = Router();

/**
 * @swagger
 * /user:
 *   post:
 *     summary: creates a new user
 *     tags: 
 *       - user
 *     description: 
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - phone 
 *             properties:
 *               email:
 *                 type: string
 *               password: 
 *                 type: string
 *               firstName: 
 *                 type: string
 *               phone: 
 *                 type: string 
 *     responses:
 *       200:
 *         description: An object with all the info of a user          
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: object
 *                   properties:
 *                     token: 
 *                       type: string
 *                     role: 
 *                       type: string 
 *                     email: 
 *                       type: string
 *                     firstName: 
 *                       type: string
 *                     phone: 
 *                       type: string
 */
routes.post("/", async (req, res) => {
  const {
    email,
    password,
    firstName,
    phone,
  } = req.body;

  try {
    const payload = await create({
      email,
      password,
      firstName,
      phone,
    });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

/**
 * @swagger
 * /user/complete:
 *   put:
 *     summary: creates a new user
 *     tags: 
 *       - user
 *     description: 
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 example: Presidente Carranza
 *               number: 
 *                 type: string
 *                 example: 94
 *               interior: 
 *                 type: string
 *                 example: 3
 *               neighborhood: 
 *                 type: string 
 *                 example: Villa Coyoacan
 *               municipality:
 *                 type: string
 *                 example: Coyoacan
 *               state:
 *                 type: string
 *                 example: Ciudad de Mexico
 *               zipcode:
 *                 type: string
 *                 example: 04000
 *               time:
 *                 type: string
 *                 example: 8:00-13:00
 *               day: 
 *                 type: string 
 *                 example: Lunes
 *               instructions:
 *                 type: string
 *                 example: Tocar el timbre
 *     responses:
 *       200:
 *         description: An object with all the info of a user          
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: object
 *                   properties:
 *                     address:
 *                       type: object
 *                       properties:
 *                         street:
 *                           type: string
 *                           example: Presidente Carranza
 *                         number: 
 *                           type: string
 *                           example: 94
 *                         interior: 
 *                           type: string
 *                           example: 3
 *                         neighborhood: 
 *                           type: string 
 *                           example: Villa Coyoacan
 *                         municipality:
 *                           type: string
 *                           example: Coyoacan
 *                         state:
 *                           type: string
 *                           example: Ciudad de Mexico
 *                         zipcode:
 *                           type: string
 *                           example: 04000
 *                     pickupInfo:
 *                       type: object
 *                       properties:
 *                         time:
 *                           type: string
 *                           example: 8:00-13:00
 *                         day: 
 *                           type: string 
 *                           example: Lunes
 *                         instructions:
 *                           type: string
 *                           example: Tocar el timbre
 */
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
    instructions,
  } = req.body;
  number = parseInt(number);  
  interior = parseInt(interior);
  zipcode = parseInt(zipcode);
  const address = { street, number, interior, neighborhood, municipality, state, zipcode };
  const pickupInfo = { time, day, instructions };
  const userId = req.params.token.sub;
  try {
    const payload = await complete(userId, { address, pickupInfo });
    res.status(202).json({ ok:true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: true, message });
  }
});

/**
 * @swagger
 * /user:
 *   get:
 *     summary: gets all the info for a user
 *     tags: 
 *       - user
 *     description: 
 *     responses:
 *       200:
 *         description: An object with all the info of a user          
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: object
 *                   properties:
 *                     address:
 *                       type: object
 *                       properties:
 *                         street:
 *                           type: string
 *                           example: Presidente Carranza
 *                         number: 
 *                           type: string
 *                           example: 94
 *                         interior: 
 *                           type: string
 *                           example: 3
 *                         neighborhood: 
 *                           type: string 
 *                           example: Villa Coyoacan
 *                         municipality:
 *                           type: string
 *                           example: Coyoacan
 *                         state:
 *                           type: string
 *                           example: Ciudad de Mexico
 *                         zipcode:
 *                           type: string
 *                           example: 04000
 *                     pickupInfo:
 *                       type: object
 *                       properties:
 *                         time:
 *                           type: string
 *                           example: 8:00-13:00
 *                         day: 
 *                           type: string 
 *                           example: Lunes
 *                         instructions:
 *                           type: string
 *                           example: Tocar el timbre
 */
routes.get("/", authHandler, async (req, res) => {
  const userId = req.params.token.sub;
  try {
    const payload = await getUserInfo(userId);

    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

/**
 * @swagger
 * /user/auth:
 *   post:
 *     summary: authenticate user
 *     tags: 
 *       - user
 *     description: 
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: diego.vignau.manjarrez@gmail.com
 *               password: 
 *                 type: string
 *                 example: contraseña
 *     responses:
 *       200:
 *         description: token to identify the user       
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: object
 *                   properties:
 *                     token: 
 *                       type: string 
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDE0OWEzMDc4Y2Q3N2YxYTY3ZjVkZjgiLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjc5MDczNzM0LCJleHAiOjE2NzkwNzczMzR9.scpp988HkfUivUfdBAZ10aK6ipYYj7VCN-L5OiU3kv4
 *                     role:
 *                       type: string
 *                       example: client
 */
routes.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authenticate(email, password);
    res.status(202).json({ ok: true, payload: result.token, role: result.role });
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

/**
 * @swagger
 * /user/subscription:
 *   post:
 *     summary: authenticate user
 *     tags: 
 *       - user
 *     description: 
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: array
 *             items: 
 *               type: object
 *               properties:
 *                 quantity: 
 *                   type: number
 *                   example: 1
 *                 period:
 *                   type: number
 *                   example: 1
 *                 size:
 *                   type: string
 *                   example: CHICO
 *     responses:
 *       200:
 *         description: token to identify the user       
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: string
 *                   description: url for stripe checkout
 *                   example: https://checkout.stripe.com/c/pay/cs_test_a11HtDo6udHWJmraR12nG93r239cIN1RV4UX6jMLgFFoYOaoXzJmtZ6iBh#fidkdWxOYHwnPyd1blpxYHZxWjA0SGF3YVRHfFA2SX89R0Y3UF1JTndAMzxhcUpQMjA3czBJfEpdX0BsMzJtY3RvQk19VGR2QkM9Y2lHVHJBd2tsYHBgU0ZCQWE9N0k8XXRgNH9IYUxCb2oxNTVfSH1BaGtkaycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl
 *                   
 */
routes.post("/subscription", authHandler, async (req, res) => {
  const userId = req.params.token.sub;
  const body = req.body;
  try {
    const payload = await subscription.createStripeCheckoutSession({
      userId,
      body
    });
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

module.exports = routes;
