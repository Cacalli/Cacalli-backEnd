const { Router } = require("express");
const routes = Router();

const {
  createPayment,
  getPaymentById,
  getAllPayments,
  updatePayment,
  getPaymentByDate,
  delPayment,
} = require("./../usecases/payments/index");

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

// get payment by date
routes.get("/", async (req, res) => {
  const { date } = req.body;
  try {
    const payload = getPaymentByDate({ date });
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(404).json({ ok: true, message });
  }
});

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

//delete payment (cancelled payment)
routes.delete("/:id", async (req, res) => {
  try {
    const payload = await delPayment(id);
    res.json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(404).json({ ok: true, message });
  }
});

//get payment by date
routes.get("/:date", async (req, res) => {
  const { date } = req.params;
  try {
    const payload = await getPaymentByDate(date);
  } catch (error) {
    const { message } = error;
    res.status(404).json({ ok: true, message });
  }
});

//get most recent payment
//(pending)
