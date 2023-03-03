const Zone = require("../../models/zone").model;
const schedules = require("./schedules");
const zipCodes = require("./zipCodes");

const create = async (data) => {
    const {name} = data;
    const zone = new Zone({name});
    return await zone.save();
};

const getById = async (id) => await Zone.findById(id);

const getAll = async ({}) => await Zone.find({});

const update = async (id, data) => await Zone.findByIdAndUpdate(id, data);

const del = async (id) => await Zone.findByIdAndDelete(id);

const getZipcodes = async (id) => {
    const zone = await Zone.findById(id);
    const zipCodes = zone.zipCodes;
    return zipCodes;
};

const getSchedules = async (id) => {
    const zone = await Zone.findById(id);
    const schedules = zone.schedules;
    return schedules;
};

// Returns every zone where the zipCode is available
const checkZipcode = async (data) => {
    const {zipcode} = data;
    const allZones = await Zone.find({});
    if(allZones.length > 0){
        const availableZones = allZones.filter(zone => zone.zipCodes.includes(zipcode));
        return availableZones;
    } 
    else {
        return null;
    }
};

module.exports = {
    create,
    getById,
    getAll,
    update,
    del,
    getZipcodes,
    getSchedules,
    checkZipcode,
    schedules,
    zipCodes,
};