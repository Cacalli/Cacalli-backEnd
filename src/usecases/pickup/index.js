const Pickup = require("../../models/pickup").model;
const User = require("../../models/user").model;

const create = async(data) => {
    const {user, date} = data;
    const newPickup= new Pickup({user, date, status: 'on time'});
    return await newPickup.save();
};

const getAllPickups = async () => {
    const allPickups = await Pickup.find({}).exec();
    const pickups = await Promise.all(
            allPickups.map( async (pickup) => {
                const user = await User.findById(pickup.user);
                return { name: user.firstName, phone: user.phone, email: user.email, date: pickup.date, status: pickup.status };
        })
    );
    return pickups;
};

const getAllPickupsByUser = async (user) => {
    const allPickups = await Pickup.find({user}).exec();
    const orderedPickups = allPickups.sort((a,b) => {
        return new Date(b.date) - new Date(a.date);
    });
    return orderedPickups;
};

const updatePickup = async (id, data) => await Pickup.findByIdAndUpdate(id, data);
 
const deletePickup = async (id) => await Pickup.findByIdAndDelete(id).exec(); 

const updateForToday = async () => {
    const today = new Date();
    await Pickup.updateMany(
        { date: {$lt: today}, status: "on time"}, {status: "delayed"}
    )
}
 
const getNextPickup = async(user) => {
    console.log(user);
    const pickups = await Pickup.find({user, status: 'on time'}).exec();
    const nextPickup = pickups[0];
    return nextPickup;
};

const getLastPickup = async (user)=>{
    const pickups = await Pickup.find({user, status: 4});
    const orderedPickups = pickups.sort((a,b) => {
        return new Date(b.date) - new Date(a.date);
    });
    const lastPickup = pickups[0];
    return lastPickup;
};

const getPickupsByDate = async(date) => {
    return await Pickup.find({date}).exec();
};

const cancelPickup = async (id) => await updatePickup(id, {status: 'cancelled'});

const delayPickup = async (id) => await updatePickup(id, {status: 'delayed'}); 

const completePickup = async (id) => await updatePickup(id, {status: 'complete'});

module.exports={
    create,
    getAllPickups,
    getAllPickupsByUser,
    updatePickup,
    deletePickup,
    updateForToday,
    getNextPickup,
    getLastPickup,
    getPickupsByDate,
    cancelPickup,
    delayPickup,
    completePickup,
};