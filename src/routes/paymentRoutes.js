const { Router } = require("express");
const routes = Router();

const {
  createPayment,
  getPaymentById,
  getAllPayments,
  updatePayment,
  delPayment,
} = require("./../usecases/payments/index");

//create payment
routes.post("/", async (req, res) => {
  try {
  } catch (error) {}
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
routes.get("/:date", async (req, res) => {
  try {
    if (req.params.date == date) {
    }
  } catch (error) {}
});
//update payment
routes.put("/", async (req, res) => {
  try {
  } catch (error) {}
});
//delete payment (?) should it be cancell payment
routes.delete("/:id", async (req, res) => {});
