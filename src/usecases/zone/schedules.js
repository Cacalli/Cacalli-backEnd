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
    const {zipcode} = data;
    const allZones = await Zone.find({});
    const availableZones = allZones.filter(zone => zone.zipCodes.includes(zipcode));
    const availableDays = [];
    availableZones.forEach((zone) => {
        zone.schedules.forEach((schedule) => {
            if(!availableDays.includes(schedule.day)){
                availableDays.push(schedule.day);
            }
        });
    });
    const availableDaysTransformed = transformNumbersToDays(availableDays);
    return availableDaysTransformed;
};

const getSchedulesAvailable = async (data) => {
    const {zipcode, day} = data;
    const dayNumber = transformDayToNumber(day);
    const allZones = await Zone.find({});
    const availableZones = allZones.filter(zone => zone.zipCodes.includes(zipcode));
    const availableSchedules = [];
    availableZones.forEach((zone) => {
        zone.schedules.forEach((schedule) => {
            if(schedule.day == dayNumber){
                if(!availableSchedules.includes(schedule.time)){
                    availableSchedules.push(schedule.time);
                }
            }
        });
    });
    const availableSchedulesTransformed = transformNumbersToSchedules(availableSchedules);
    return availableSchedulesTransformed;
};

const numbersDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const numbersSchedules = ["02:00-07:00", "8:00-13:00", "16:00-21:00", "22:00-01:00"];
   
const transformNumbersToDays = (numbers) => {
    const days = numbers.map(number => numbersDays[number - 1]);
    return days;
};

const transformDayToNumber = (day) => {
    const number = numbersDays.indexOf(day) + 1;
    return number
};

const transformNumbersToSchedules = (numbers) => {
    const schedules = numbers.map(number => numbersSchedules[number -1]);
    return schedules;
}

module.exports = {
    addSchedule,
    getSchedule,
    delSchedule,
    getDaysAvailable,
    getSchedulesAvailable,
};