const Zone = require("../../models/zone").model;

const create = async (data) => {
    const {name} = data;
    const zone = new Zone({name});
    return await zone.save();
};

const getById = async (id) => await Zone.findById(id);

const getAll = async ({}) => await Zone.find({});

const update = async (id, data) => await Zone.findByIdAndUpdate(id, data);

const del = async (id) => await Zone.findByIdAndDelete(id);

const getZipCodes = async (id) => {
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
const checkZipCode = async (zipCode) => {
    const allZones = await Zone.find({});
    if(allZones.length > 0){
        const availableZones = allZones.filter(zone => zone.zipCodes.includes(zipCode));
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
    getZipCodes,
    getSchedules,
    checkZipCode,
};