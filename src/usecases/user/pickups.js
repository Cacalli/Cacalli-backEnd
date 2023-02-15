const User = require("../../models/user").model;
const pickup = require("../pickup");
const package = require("../package");

const getNextPickup = async (id) => {
    const nextPickup = await pickup.getNextPickup(id);
    console.log(nextPickup)
    return nextPickup;
};

const getLastPickup = async (id) => {
    const lastPickup = await pickup.getLastPickup(id);
    return lastPickup;
};

const getAllPickups = async (id) => {
    const allPickups = await pickup.getAllPickupsByUser(id);
    return allPickups;
};

const completePickup = async (id) => {
    const user = await User.findById(id);
    const nextPickup = await pickup.getNextPickup(id);
    await pickup.completePickup(nextPickup.id);
    const pickupPeriod = await getPickupPeriod(id);
    const pickupDay = user.pickupInfo.day;
    const newDate = getNextWeekDay(nextPickup.date, pickupDay);
    console.log(newDate);
    if(pickupPeriod == 2){
        newDate.setDate(newDate.getDate() + 7);
    }
    const newPickup = await pickup.create({user: id, date: newDate});
    return newPickup;
};

const delayPickup = async (id) => {
    const user = await User.findById(id);
    const nextPickup = await pickup.getNextPickup(id);
    await pickup.delayPickup(nextPickup.id);
    const pickupDay = user.pickupInfo.day;
    const newDate = getNextWeekDay(nextPickup.date, pickupDay);
    const newPickup = await pickup.create({user: id, date: newDate});
    return newPickup;
};

const getNextWeekDay = (date, weekDay) => {
    const newDate = date;
    newDate.setDate(date.getDate() + ((7 - date.getDay() + weekDay) % 7 || 7));
    return newDate;
};

const getPickupPeriod = async (id) => {
    const user = await User.findById(id);
    const packageId = user.subscription.packages[0];
    const mainPackage = await package.getById(packageId);
    const pickupPeriod = mainPackage.pickupPeriod;
    return pickupPeriod;
};

module.exports = {
    getNextPickup,
    getLastPickup,
    getAllPickups,
    completePickup,
    delayPickup,
};