const Pickup = require("../../models/pickup").model;

const create = async(data) => {
    const {user, date} = data;
    const newPickup= new Pickup({user, date, status: 3});
    return await newPickup.save();
};

const getAllPickups = async () => await Pickup.find({}).exec();

const getAllPickupsByUser = async (user) => {
    const allPickups = await Pickup.find({user}).exec();
    const orderedPickups = allPickups.sort((a,b) => {
        return new Date(b.date) - new Date(a.date);
    });
    return orderedPickups;
}

const updatePickup = async (id, data) => await Pickup.findByIdAndUpdate(id, data);
 
const deletePickup = async (id) => await Pickup.findByIdAndDelete(id).exec(); 
 
const getNextPickup = async(user) => {
    const nextPickup = await Pickup.find({user, status: 3}).exec();
    const pickups = await getAllPickupsByUser(user);
    const nextPickup = pickups[0];
    return nextPickup;
};

const getLastPickup = async (user)=>{
    const pickups = await getAllPickupsByUser(user);
    const lastPickup = pickups[1];
    return lastPickup;
};

const getPickupsByDate = async(date) => {
    return await Pickup.find({date}).exec();
};

const cancelPickup = async (id) => await updatePickup(id, {status: 1});

const delayPickup = async (id) => await updatePickup(id, {status: 2}); 

const completePickup = async (id) => await updatePickup(id, {status: 4});

module.exports={
    create,
    getAllPickups,
    getAllPickupsByUser,
    updatePickup,
    deletePickup,
    getNextPickup,
    getLastPickup,
    getPickupsByDate,
    cancelPickup,
    delayPickup,
    completePickup,
};