const User = require("../../models/user").model;
const userUsecases = require("../user");
const package = require("../package");
const zone = require("../zone");

const getPickupPeriod = (id) => {
    const user = await userUsecases.findById(id);
    const packageId = user.subscription.packages[0];
    const mainPackage = package.getById(packageId);
    const pickupPeriod = mainPackage.pickupPeriod;
    return pickupPeriod;
};

const getPickupZone = (id) => {
    const user = await userUsecases.findById(id);
    const pickupStatus = user.pickupInfo.status;
    return pickupStatus;
};

const setPickupZone = (data) => {
    const {userId, zoneId} = data;
    const user = await userUsecases.findById(userId);
    const zipCode = user.address.zipCode;
    const availableZones =  zone.checkZipCode(zipCode);
    let newZone = zone.getById(zoneId);
    if(availableZones.includes(newZone)){
        user.pickupInfo.zone = zoneId;
        userUsecases.update(userId, user);       
    } else {
        newZone = null;
    }
    return newZone;
};

const getPickupDay = (id) => {
    const user = await User.findById(id);
    const pickupDay = user.pickupInfo.day;
    return pickupDay
};

const getPickupTime = (id) => {
    const user = await User.findById(id)
    const pickupTime = user.pickupInfo.time
    return pickupTime
};

const setPickup = (data) => {
    const {userId, pickupDay, pickupTime} = data;
    const user = await userUsecases.findById(userId);
    const isPickupAvailable = false; 
    user.pickupInfo.zone.schedules.forEach(schedule => {
        if(schedule.day == pickupDay && schedule.time == pickupTime) {
            isPickupAvailable = true;
        }
    });
    if(isPickupAvailable){
        user.pickupInfo.day = pickupDay;
        user.pickupInfo.time = pickupTime;
        userUsecases.update(userId, user);
    } 
    return isPickupAvailable;
};

module.exports = {
    getPickupPeriod,
    getPickupZone,
    setPickupZone,
    getPickupDay,
    getPickupTime,
    setPickup,
};