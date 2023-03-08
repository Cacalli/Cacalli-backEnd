const User = require("../../models/user").model;
const package = require("../package");
const zone = require("../zone");

const getPickupPeriod = async (id) => {
    const user = await User.findById(id);
    const packageId = user.subscription.packages[0];
    const mainPackage = await package.getById(packageId);
    const pickupPeriod = mainPackage.pickupPeriod;
    return pickupPeriod;
};

const getPickupZone = async (id) => {
    const user = await User.findById(id);
    const pickupZone = user.pickupInfo.zone;
    return pickupZone;
};

const setPickupZone = async (data) => {
    const {userId, zoneId} = data;
    const user = await User.findById(userId);
    const zipCode = user.address.zipCode;
    const availableZones =  await zone.checkZipCode(zipCode);
    let newZone = await zone.getById(zoneId);
    const availableZonesNames = availableZones.map(z => z.name);
    
    if(availableZonesNames.includes(newZone.name)){
        user.pickupInfo.zone = zoneId;
        const updatedUser = await User.findByIdAndUpdate(userId, user);       
    } else {
        newZone = null;
    }
    return newZone;
};

const getPickupDay = async (id) => {
    const user = await User.findById(id);
    const pickupDay = user.pickupInfo.day;
    return pickupDay;
};

const getPickupTime = async (id) => {
    const user = await User.findById(id);
    const pickupTime = user.pickupInfo.time;
    return pickupTime
};

const setPickup = async (userId, data) => {
    const { time, day } = data;
    // const user = await User.findById(userId);
    // let isPickupAvailable = false; 
    // const schedules = await zone.schedules.getAllSchedules({zoneId: user.pickupInfo.zone});
    // schedules.forEach(schedule => {
    //     if(schedule.day == pickupDay && schedule.time == pickupTime) {
    //         isPickupAvailable = true;
    //     }
    // });
    // if(isPickupAvailable){
    //     user.pickupInfo.day = zone.schedules.transformDayToNumber(pickupDay);
    //     user.pickupInfo.time = zone.schedules.transformScheduleToNumber(pickupTime);
    //     await User.findByIdAndUpdate(userId, user);
    // } 
    // return isPickupAvailable;
    user.pickupInfo.day = zone.schedules.transformDayToNumber(day);
    user.pickupInfo.time = zone.schedules.transformScheduleToNumber(time);
    const updatedUser = await User.findByIdAndUpdate(userId, user);
    return updatedUser;
};

module.exports = {
    getPickupPeriod,
    getPickupZone,
    setPickupZone,
    getPickupDay,
    getPickupTime,
    setPickup,
};