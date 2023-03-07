const User = require("../../models/user").model;
const { hashPassword, verifyPassword } = require("../../lib/encrypt");
const { createToken, verifyToken } = require("../../lib/jwt");
const pets = require("./pets");
const subscription = require("./subscription");
const usecasesPickupInfo = require("./pickupInfo");
const pickups = require("./pickups");
const zone = require("../zone");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const create = async (data) => {
  const {
    email,
    password,
    firstName,
    phone,
  } = data;

  const hash = await hashPassword(password);
  const user = new User({
    email,
    password: hash,
    firstName,
    phone,
  });
  return await user.save();
};

const findById = async (id) => await User.findById(id);

const del = async (id) => await User.findByIdAndDelete(id);

const update = async (id, data) => await User.findByIdAndUpdate(id, data, {new: true});

const complete = async (id, data) => {
  const { address, pickupInfo } = data;
  pickupInfo.day = await zone.schedules.transformDayToNumber(pickupInfo.day);
  pickupInfo.time = await zone.schedules.transformScheduleToNumber(pickupInfo.time);
  updatedUser = await update(id, { address, pickupInfo });
  return updatedUser;
}

const findByEmail = async (email) => await User.findOne({ email });

const findByStripeId = async (customerStripeId) => await User.findOne({ customerStripeId })

const getAllClients = async () => await User.find({role: 'client'});

const authenticate = async (email, password) => {
  const user = await findByEmail(email);
  const hash = user.password;

  const isVerified = await verifyPassword(password, hash);
  if (!isVerified) throw new Error("Wrong password");
  const token = createToken({ sub: user._id, role: user.role });
  return {token, role: user.role};
};

const addPaymentMethod = async (paymentMethodId, userId) => {
  const user = await findById(userId);
  const customer = user.customerStripeId;
  const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
    customer,
  });

  return paymentMethod;
};

module.exports = {
  create,
  findById,
  del,
  update,
  complete,
  authenticate,
  findByEmail,
  findByStripeId,
  getAllClients,
  pets,
  subscription,
  usecasesPickupInfo,
  pickups,
  addPaymentMethod,
};
