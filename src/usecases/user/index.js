const User = require("../../models/user").model;
const { hashPassword, verifyPassword } = require("../../lib/encrypt");
const { createToken } = require("../../lib/jwt");
const pets = require("./pets");
const subscription = require("./subscription");
const usecasesPickupInfo = require("./pickupInfo");
const pickups = require("./pickups");
const usecasesZone = require("../zone");
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
  const newUser = await user.save();
  const auth = await authenticate(email, password);
  const newUserPayload = (({ email, firstName, phone }) => ({ email, firstName, phone }))(newUser);
  const userAuthenticated = { ...auth, ...newUserPayload };
  return userAuthenticated;
};

const findById = async (id) => await User.findById(id);

const del = async (id) => await User.findByIdAndDelete(id);

const update = async (id, data) => await User.findByIdAndUpdate(id, data, {new: true});

const complete = async (id, data) => {
  const { address, pickupInfo } = data;
  pickupInfo.day = await zone.schedules.transformDayToNumber(pickupInfo.day);
  pickupInfo.time = await zone.schedules.transformScheduleToNumber(pickupInfo.time);
  updatedUser = await update(id, { address, pickupInfo });
  const updatedPickupInfoPretty = { time: zone.schedules.transformNumberToSchedule(updatedUser.pickupInfo.time), 
                        day: zone.schedules.transformNumberToDay(updatedUser.pickupInfo.day),
                        instructions: pickupInfo.instructions };
  const updatedAddress = updatedUser.address;
  const updatedUserPayload = { pickupInfo: updatedPickupInfoPretty, address: updatedAddress};
  return updatedUserPayload;
}

const findByEmail = async (email) => await User.findOne({ email });

const findByStripeId = async (customerStripeId) => await User.findOne({ customerStripeId });

const getClients = async (data) => {
  const { zone, day, time, status } = data;
  const dayNumber = usecasesZone.schedules.transformDayToNumber(day);
  const timeNumber = usecasesZone.schedules.transformScheduleToNumber(time);
  const zoneObject = await usecasesZone.getByName(zone);
  const zoneId = zoneObject.id;
  const clients = await User.find({role: 'client', 'pickupInfo.zone': zoneId, 'pickupInfo.time': timeNumber, 'pickupInfo.day': dayNumber});
  return clients;
}


const authenticate = async (email, password) => {
  const user = await findByEmail(email);
  const hash = user.password;

  const isVerified = await verifyPassword(password, hash);
  if (!isVerified) throw new Error("Wrong password");
  const token = createToken({ sub: user._id, role: user.role });
  return {token, role: user.role};
};

const getUserInfo = async (id) => {
  const user = await findById(id);
  returnInfo = (({ email, firstName, phone, address, pickupInfo, subscription }) => ({ email, firstName, phone, address, pickupInfo, subscription }))(user);
  return returnInfo;
}


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
  getClients,
  pets,
  subscription,
  usecasesPickupInfo,
  pickups,
  getUserInfo,

  addPaymentMethod,
};
