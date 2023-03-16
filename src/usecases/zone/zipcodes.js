const Zone = require("../../models/zone").model;

const addZipcode = async (data) => {
    const {name, zipcode} = data;
    const zone = await Zone.findOne({ name });
    // check it doesn't exists already
    zone.zipcodes.push(zipcode);
    const zoneId = zone.id;
    await Zone.findByIdAndUpdate(zoneId, zone);
    return zipcode;
}; 

const getZipcodes = async (data) => {
    const { name } = data;
    const zone = await Zone.findOne({ name });
    return zone.zipcodes;
}

const delZipcode = async (data) => {
    const {name, zipcode} = data;
    const zone = await Zone.findOne({ name });
    const zoneId = zone.id;
    zone.zipcodes = zone.zipcodes.filter(item => item != zipcode);
    await Zone.findByIdAndUpdate(zoneId, zone);
    return zipcode;
};

module.exports = {
    addZipcode,
    getZipcodes,
    delZipcode,
};