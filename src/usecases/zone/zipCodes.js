const Zone = require("../../models/zone").model;

const addZipCode = async (data) => {
    const {zoneId, code} = data;
    const zone = await Zone.findById(zoneId);
    // check it doesn't exists already
    zone.zipCodes.push(code);
    const updatedZone = await Zone.findByIdAndUpdate(zoneId, zone);
    return updatedZone;
}; 

const getAllZipCodes = async (data) => {
    const {zoneId} = data;
    const zone = await Zone.findById(zoneId);
    const zipCodes = zone.zipCodes;
    return zipCodes;
};

const delZipCode = async (data) => {
    const {zoneId, code} = data;
    const zone = await Zone.findById(zoneId);
    zone.zipCodes = zone.zipCodes.filter(item => item != code);
    const updatedZone = await Zone.findByIdAndUpdate(zoneId, zone);
    return updatedZone;
};

module.exports = {
    addZipCode,
    getAllZipCodes,
    delZipCode,
};