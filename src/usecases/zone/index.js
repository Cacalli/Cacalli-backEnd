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

const getAll = async () => await Zone.find({});

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

const getAvailableCombos = async (data) => {
    const { day, time, zone } = data;
    let zoneCheckArray = [];
    zones = await getAll();
    zones.forEach((zoneItem) => {
        zoneItem.schedules.forEach((scheduleItem) => {
            zoneCheckArray.push({name: zoneItem.name, day: scheduleItem.day, time: scheduleItem.time});
        });
    });
    zoneCheckArray = zoneCheckArray.filter((item) => {
        let valid = true;
        if(zone){
            valid = item.name == zone;
        }
        if(day && valid){
            dayNumber = schedules.transformDayToNumber(day);
            valid = item.day == dayNumber;
        }
        if(time && valid){
            timeNumber = schedules.transformScheduleToNumber(time);
            valid = item.time == timeNumber;
        }
        return valid;
    });
    let zonesReturn = [];
    let daysReturn = [];
    let timesReturn = [];
    zoneCheckArray.forEach((item) => {
        if(!zonesReturn.includes(item.name)){zonesReturn.push(item.name);}
        if(!daysReturn.includes(schedules.transformNumberToDay(item.day))){daysReturn.push(schedules.transformNumberToDay(item.day));}
        if(!timesReturn.includes(schedules.transformNumberToSchedule(item.time))){timesReturn.push(schedules.transformNumberToSchedule(item.time));}
        console.log(timesReturn)

    });
    return {zones: zonesReturn, days: daysReturn, times: timesReturn};
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
    getAvailableCombos,
    schedules,
    zipcodes,
};