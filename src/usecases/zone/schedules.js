const Zone = require("../../models/zone").model;

const addSchedule = async (data) => {
    const {zoneId, day, time} = data;
    const zone = await Zone.findById(zoneId);
    // check it doesn't exists already
    zone.schedules.push({day, time});
    const updatedZone = await Zone.findByIdAndUpdate(zoneId, zone);
    return updatedZone;
}; 

const getSchedule = async (data) => {
    const {zoneId, day, time} = data;
    const zone = await Zone.findById(zoneId);
    const schedule = zone.schedules.find(item => item.day == day && item.time == time);
    return schedule;
};

const delSchedule = async (data) => {
    const {zoneId, day, time} = data;
    const zone = await Zone.findById(zoneId);
    zone.schedules = zone.schedules.filter(item => item.day != day || item.time != time);
    const updatedZone = await Zone.findByIdAndUpdate(zoneId, zone);
    return updatedZone;
};

const getDaysAvailable = async (data) => {
    const {zipCode} = data;
    const allZones = await Zone.find({});
    const availableZones = allZones.filter(zone => zone.zipCodes.includes(zipCode));
    const availableDays = [];
    availableZones.forEach((zone) => {
        zone.schedules.forEach((schedule) => {
            if(!availableDays.includes(schedule.day)){
                availableDays.push(schedule.day);
            }
        });
    });
    console.log(availableDays);
    return availableDays;
};

const getSchedulesAvailable = async (data) => {
    const {zipCode, day} = data;
    const allZones = await Zone.find({});
    const availableZones = allZones.filter(zone => zone.zipCodes.includes(zipCode));
    const availableSchedules = [];
    availableZones.forEach((zone) => {
        zone.schedules.forEach((schedule) => {
            if(schedule.day == day){
                if(!availableSchedules.includes(schedule.time)){
                    availableSchedules.push(schedule.time);
                }
            }
        });
    });
    console.log(availableSchedules);
    return availableSchedules;
};


module.exports = {
    addSchedule,
    getSchedule,
    delSchedule,
    getDaysAvailable,
    getSchedulesAvailable,
};