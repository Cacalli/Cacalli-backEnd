const Payment = require("../../models/payment").model;

/**
 * 1. create payment
 * 2. update payment
 * 3. delete payment (cancel payment(?))
 * 4. get payment by user (this use case goes in the user domain)
 * 5. get payment by id and by date
 * 6. get all payments
 * 7. get most recent payment
 */

const createPayment = async (data) => {
  const { amount, payment_status } = data;
  const newPayment = new Payment({ amount, payment_status });
  return await newPayment.save();
};
const updatePayment = async (id, data) => {
  const { amount, payment_status, date } = data;
  return await Payment.findByIdAndUpdate(id, {
    amount,
    payment_status,
    date,
  }).exec();
};

const getAllPayments = async () => await Payment.find({});
const getPaymentById = async (id) => await Payment.findById(id);
const delPayment = async (id) => await Payment.findByIdAndDelete(id).exec();
const getPaymentByDate = async (payment_date) =>
  await Payment.find({ date: payment_date }).exec();

module.exports = {
  createPayment,
  updatePayment,
  getAllPayments,
  getPaymentById,
  getPaymentByDate,
  delPayment,
};
