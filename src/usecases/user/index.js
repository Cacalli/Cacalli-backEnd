const User = require("../../models/user").model;
const { hashPassword, verifyPassword } = require("../../lib/encrypt");
const { createToken } = require("../../lib/jwt");
const pets = require("./pets");
const subscription = require("./subscription");
const usecasesPickupInfo = require("./pickupInfo");
const pickups = require("./pickups");
const usecasesZone = require("../zone");
const usecasesPackages = require("../package");
const usecasesInvoice = require("../invoice");

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

const findByEmail = async (email) => await User.findOne({ email });

const findByStripeId = async (customerStripeId) => await User.findOne({ customerStripeId });

const complete = async (id, data) => {
  const { address, pickupInfo } = data;
  pickupInfo.day = await usecasesZone.schedules.transformDayToNumber(pickupInfo.day);
  pickupInfo.time = await usecasesZone.schedules.transformScheduleToNumber(pickupInfo.time);
  pickupInfo.zone = await usecasesZone.getByZipcodeAndSchedule({ day: pickupInfo.day, time: pickupInfo.time, zipcode:address.zipcode });
  updatedUser = await update(id, { address, pickupInfo });
  const updatedPickupInfoPretty = { time: usecasesZone.schedules.transformNumberToSchedule(updatedUser.pickupInfo.time), 
                        day: usecasesZone.schedules.transformNumberToDay(updatedUser.pickupInfo.day),
                        instructions: pickupInfo.instructions };
  const updatedAddress = updatedUser.address;
  const updatedUserPayload = { pickupInfo: updatedPickupInfoPretty, address: updatedAddress};
  return updatedUserPayload;
};

const getClients = async (data) => {
  const query = {role: 'client'};
  const { zone, day, time, status } = data;
  if(day) {
    const dayNumber = usecasesZone.schedules.transformDayToNumber(day);
    query['pickupInfo.day']= dayNumber;
  }
  if(time) {
    const timeNumber = usecasesZone.schedules.transformScheduleToNumber(time);
    query['pickupInfo.time'] = timeNumber;
  }
  if(zone) {
    const zoneObject = await usecasesZone.getByName(zone);
    const zoneId = zoneObject._id;
    query['pickupInfo.zone'] = zoneId;
  }
  let clients = await User.find(query);
  clients = await Promise.all(
    clients.map(async (client) => {
      return makePretty(client);
    })
  );
  clients = clients.sort((a,b) => {
    return new Date(a.pickupInfo.nextPickup) - new Date(b.pickupInfo.nextPickup);
  })
  return clients;
};

const authenticate = async (email, password) => {
  const user = await findByEmail(email);
  const hash = user.password;

  const isVerified = await verifyPassword(password, hash);
  if (!isVerified) throw new Error("Wrong password");
  const token = createToken({ sub: user._id, role: user.role });
  return {token, role: user.role};
};

const makePretty = async (user) => {
    if(user.subscription.packages.lenght > 0){
      const userPackages = await Promise.all(
        user.subscription.packages.map(async (package) => {
          const packageInfo = await usecasesPackages.getById(package.packageId);
            return { quantity: package.quantity, packageName: packageInfo.name, pickupPeriod: packageInfo.pickupPeriod };
        })
      );
      const userSubscription = {packages: userPackages, startDate: user.subscription.startDate };
    }
    if(user.pickupInfo != null) {
    const userPickupInfo = { day: usecasesZone.schedules.transformNumberToDay(user.pickupInfo.day), time: usecasesZone.schedules.transformNumberToSchedule(user.pickupInfo.day) };
    const nextPickup = await pickups.getNextPickup(user.id);
      if(nextPickup){
        userPickupInfo.nextPickup = nextPickup.date;
        userPickupInfo.status = nextPickup.status;
      }
    console.log('1')
    const zone = await usecasesZone.getById(user.pickupInfo.zone);
    userPickupInfo.zone = zone.name;
    }
    let returnInfo = (({ email, firstName, phone }) => ({ email, firstName, phone }))(user);
    console.log('2')
    if(user.address) {
      returnInfo.address = user.address;
    }
    console.log('3')
    returnInfo.subscription = userSubscription;
    returnInfo.pickupInfo = userPickupInfo;
    return returnInfo;
  };

const getUserInfo = async (id) => {
  let user = await findById(id);
  const testPayments = await usecasesInvoice.getAllPaymentsByUser({userId: id});
  const returnInfo = await makePretty(user);
  returnInfo.payments = testPayments;
  return returnInfo;
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
};
