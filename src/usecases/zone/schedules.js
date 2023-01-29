const Zone = require("../../models/zone").model;

const addSchedule = async (data) => {
    const {zoneId, day, time} = data;
    const zone = await Zone.findById(zoneId);
    // check it doesn't exists already
    zone.schedules.push({day, time});
    const newSchedule = await User.findByIdAndUpdate(zoneId, zone);
    return newSchedule;
}; 

const getSchedule = async (data) => {
    const {zoneId, day, time} = data;
    const zone = await Zone.findById(zoneId);
    const schedule = zone.schedules.find(item => item.day == day && item.time == time);
    return schedule;
};

const getAllSchedules = async (data) => {
    const {zoneId} = data;
    const zone = await Zone.findById(zoneId);
    const schedules = zone.schedules;
    return schedules;
};

const delSchedule = async (data) => {
    const {zoneId, day, time} = data;
    const zone = await Zone.findById(zoneId);
    zone.schedules = zone.schedules.filter(item => item.day != day || item.time != time);
    const updatedZone = await User.findByIdAndUpdate(zoneId, zone);
    return updatedZone;
};


module.exports = {
    addSchedule,
    getSchedule,
    getAllSchedules,
    delSchedule,
};