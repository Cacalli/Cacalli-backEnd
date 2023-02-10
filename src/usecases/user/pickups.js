//Acualización de ecolecciones...
const User = require("../../models/user").model;
const pickup = require("../pickup")

const getNextPickup = (id) => {
    const nextPickup = await pickup.getNextPickup(id);
    return nextPickup;
};

const getLastPickup = (id) => {
    const lastPickup = await pickup.getLastPickup(id);
    return lastPickup;
};

const getAllPickups = (id) => {
    const allPickups = pickup.getAllPickupsByUser(id);
    return allPickups;
};

const completePicup = (id) => {

};

const delayPickup = id => {

};

module.exports = {
    getNextPickup,
    getLastPickup,
    getAllPickups,
};