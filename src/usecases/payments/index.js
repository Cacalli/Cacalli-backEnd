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
  await Payment.find({ date: payment_date });

/** El caso de uso para traer los pagos de un usuario, debe ir colocado en los casos de uso de usuario. Porque el schema de usuario esta haciendo referencia al schema de pagos, por lo que al hacer el caso de uso podemos utilizar el id del pago como parametro para encontrar la informacion. Esto no se podria hacer al reves, ya que el schema de pago no esta haciendo referencia al schema de usuario */
// const getPaymentByUser = async (userId) =>
//   await Payment.find({ payment: payment._id });

module.exports = {
  createPayment,
  updatePayment,
  getAllPayments,
  getPaymentById,
  getPaymentByDate,
  delPayment,
};
