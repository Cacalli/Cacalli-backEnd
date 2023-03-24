const Invoice = require("../../models/invoice").model;

const create = async(data) => {
    let { userId, creationDate, total, status, pdf, period } = data;
    creationDate = creationDate*1000;
    period.start = period.start*1000;
    period.end = period.end*1000;
    const newPayment = new Invoice({ userId, creationDate, total, status, period, pdf });
    return await newPayment.save();
};

const update = async (data) => {
    const { status, paymentStripeId } = data;
    const payment = await getByStripeId(paymentStripeId);
    payment.status = status;
    const paymentId = payment.id;
    return await Invoice.findByIdAndUpdate(paymentId, payment, {new: true});
};

const getByStripeId = async (data) => {
    const { paymentStripeId } = data;
    return await Invoice.find({ paymentStripeId });
};

const getAllPaymentsByUser = async (data) => {
    const { userId } = data;
    const allPayments =  await Invoice.find({ userId });
    const prettyPayments = allPayments.map((payment) => {
        const paymentPeriodString = payment.period.start.toDateString() + ' - ' + payment.period.end.toDateString(); 
        const totalPesos = payment.total/100;
        const prettyPayment = {mes: paymentPeriodString, fecha: payment.creationDate, monto: totalPesos, estado: payment.status, descarga: payment.pdf};
        return prettyPayment;
    });
    return prettyPayments;
};



module.exports = {
  create,
  update,
  getAllPaymentsByUser,
};