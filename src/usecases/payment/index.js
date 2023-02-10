const Payment = require("../../models/payment").model;

/**
 * 1. create payment
 * 2. update payment
 * 3. delete payment
 * 4. get payment by user (this use case goes in the user domain)
 * 5. get payment
 * 6. get all payments
 */

const createPayment = async (data) => {
  const { amount, payment_status, date } = data;
  const newPayment = new Payment({ amount, payment_status, date });
  return await newPayment.save();
};

const updatePayment = async (id, data) => {
  const { amount, status, date } = data;
  return await Payment.findByIdAndUpdate(id, {
    amount,
    payment_status,
    date,
  });
};

const cancelPayment = async (id) => await Payment.findByIdAndUpdate(id, {paymetnStatus: 'canceled'}).exec();
const getLastPayment = async (userId) => {
  const payments = await Payment.find({user: userId});
  let lastPayment = null;
  if(payments.length > 0) {
    
  }
  return lastPayment;
}
const getAllPayments = async () => await Payment.find({}).exec();

const getPaymentById = async (id) => await Payment.findById(id).exec();

const getPaymentsByUser = async (userId) => await Payment.find({user: userId}).exec();

const delPayment = async (id) => await Payment.findByIdAndDelete(id).exec();


module.exports = {
  createPayment,
  updatePayment,
  getAllPayments,
  getPaymentById,
  getPaymentsByUser,
  delPayment,
  cancelPayment,
  getLastPayment,
};
