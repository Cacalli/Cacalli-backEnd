const User = require("../../models/user").model;
const pickup = require("../pickup")

const getNextPickup = (data) => {
    
};

const getLastPickup = (data) => {

};

const getAllPickups = (id) => {
    const allPickups = pickup.getAllPickupsByUser(id);
    return allPickups;
};

const getDaysBeforePickup = (data) => {

};

const getPickupStatus = (data) => {

};

const getPickupDay = (data) => {
     
};

const getPickupTime = (data) => {

};

module.exports = {
    getNextPickup,
    getLastPickup,
    getAllPickups,
    getDaysBeforePickup,
    getPickupStatus,
    getPickupDay,
    getPickupTime,
};