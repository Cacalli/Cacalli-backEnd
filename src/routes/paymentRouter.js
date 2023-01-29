const { Router } = require("express");
const routes = Router();

const {
  createPayment,
  getPaymentById,
  getAllPayments,
  updatePayment,
  //delPayment,
} = require("../usecases/payment/index");

//create payment
routes.post("/", async (req, res) => {
  const { amount, payment_status, date } = req.body;
  try {
    const payment = createPayment({ amount, payment_status, date });
    const payload = {
      amount: payment.amount,
      status: payment.payment_status,
      date: payment.date,
    };
    res.status(201).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//get all payments
routes.get("/", async (req, res) => {
  try {
    const payload = await getAllPayments();
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//get payment by id
routes.get("/:id", async (req, res) => {
  try {
    const payload = await getPaymentById(id);
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(400).json({ ok: false, message });
  }
});

//get payment by date
//routes.get("/:date", async (req, res) => {
//try {
//validate date sent from query params with date from payment model (?)
//if (req.params.date === date) {
//}
//} catch (error) {}
//});

//update payment
routes.put("/", async (req, res) => {
  const { amount, payment_status, date } = req.body;
  try {
    const payload = updatePayment({ amount, payment_status, date });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(404).json({ ok: true, message });
  }
});

//delete payment (?) should it be cancell payment
//routes.delete("/:id", async (req, res) => {});
