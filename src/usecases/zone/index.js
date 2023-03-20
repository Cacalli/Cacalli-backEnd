const Zone = require("../../models/zone").model;
const schedules = require("./schedules");
const zipcodes = require("./zipcodes");

const create = async (data) => {
    const {name} = data;
    const zone = new Zone({name});
    const newZone = await zone.save();
    return newZone.name;
};

const getById = async (id) => await Zone.findById(id);

const getByName = async (name) => await Zone.findOne({ name });

const getByZipcodeAndSchedule = async (data) => {
    const { zipcode, day, time } = data;
    const allZones = await getAll({});
    const validZone = allZones.find((zoneItem) => {
        let valid = true;
        if(zoneItem.zipcodes.includes(zipcode)){
            valid = true;
        }
        zoneItem.schedules.forEach((schedule) => {
            if(schedule.day == day && schedule.time == time) {
                valid = true;
            } else {
                valid = false;
            }
        });
        return valid;
    });
    return validZone;
};

const getAll = async ({}) => await Zone.find({});

const update = async (id, data) => await Zone.findByIdAndUpdate(id, data);

const del = async (id) => await Zone.findByIdAndDelete(id);

const getZipcodes = async (id) => {
    const zone = await Zone.findById(id);
    const zipcodes = zone.zipcodes;
    return zipcodes;
};

const getSchedules = async (id) => {
    const zone = await Zone.findById(id);
    const schedules = zone.schedules;
    return schedules;
};

const checkZipcode = async (data) => {
    const {zipcode} = data;
    const allZones = await Zone.find({});
    if(allZones.length > 0){
        const availableZones = allZones.filter(zone => zone.zipcodes.includes(zipcode));
        const isAvailable = availableZones.length > 0;
        return {available: isAvailable};
    } 
    else {
        return null;
    }
};

module.exports = {
    create,
    getById,
    getByName,
    getByZipcodeAndSchedule,
    getAll,
    update,
    del,
    getZipcodes,
    getSchedules,
    checkZipcode,
    schedules,
    zipcodes,
};