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
 *                 example: diego.vignau.manjarrez@gmail.com
 *               password: 
 *                 type: string
 *                 example: contraseña
 *               firstName: 
 *                 type: string
 *                 example: Diego Vignau
 *               phone: 
 *                 type: string 
 *                 example: 5514907030
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
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDFhYjljYmNiZDgyODMyYTcyNDkyZDEiLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjc5NDczMTAwLCJleHAiOjE2Nzk0NzY3MDB9.m-Yl4NAve1ZLTSX0YMZh7f3uT84_v2jOKWPtraIZU9Y
 *                     role: 
 *                       type: string 
 *                       example: client
 *                     email: 
 *                       type: string
 *                       example: diego.vignau.manjarrez@gmail.com
 *                     firstName: 
 *                       type: string
 *                       example: Diego Vignau
 *                     phone: 
 *                       type: string
 *                       example: 5514907030
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
 *     summary: Completes the register information of a user
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
 *                     email: 
 *                       type: string
 *                       example: diego.vignau.manjarrez@gmail.com
 *                     firstName:
 *                       type: string
 *                       example: Diego Vignau
 *                     phone:
 *                       type: string
 *                       example: 5514907030
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
 *                     subscription:
 *                       type: object
 *                       properties:
 *                         packages: 
 *                           type: array
 *                           items: 
 *                             type: object
 *                             properties:
 *                               quantity:
 *                                 type: number
 *                                 example: 1
 *                               packageName:
 *                                 type: string
 *                                 example: chico
 *                         startDate: 
 *                           type: date
 *                           example: 2023-03-22T08:31:07.000Z
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
 *                         nextPickup:
 *                           type: date
 *                           example: 2023-03-30T08:31:10.772Z
 *                     payments: 
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           mes:
 *                             type: string
 *                             example: Wed Mar 22 2023 - Sat Apr 22 2023
 *                           fecha:
 *                             type: string
 *                             example: 2023-03-22T08:31:07.000Z
 *                           monto:
 *                             type: number
 *                             example: 100
 *                           estado:
 *                             type: string
 *                             example: open
 *                           descarga:
 *                             type: string
 *                             example: https://pay.stripe.com/invoice/acct_1MdrdQByU3Lz8BC2/test_YWNjdF8xTWRyZFFCeVUzTHo4QkMyLF9OWlc2QTRuOFhhNU9ub1cwekFndE5TNVcwY1FuYVlvLDcwMDE0Njcw0200vpC6NFA7/pdf?s=ap
 *       
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

/**
 * @swagger
 * /user/subscription:
 *   post:
 *     summary: creates a checkout session for stripe to subscribe
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
 *         description: URL to access checkout for stripe      
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
