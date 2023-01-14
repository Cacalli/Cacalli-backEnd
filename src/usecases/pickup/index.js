const Pickup= require("../../models/pickup").model;

const create=async(date,user)=>{
    const newPickup= new Pickup({date,user});

    return await newPickup.save();
};

// const getNextPickup=async(user)=>{
//     await Pickup.find({user})
// }

// const getPreviousPickup = async ()=>{

// }


//Can work for an admin account, I believe this function would get pickups from all users
const getAllPickups = async ()=>{
   return await Pickup.find({}).exec(); 
}

const getAllPickupsByUser=async (user)=>{
    return await Pickup.find({user})
}
const updatePickup = async (id, date)=>{
    return await Pickup.findByIdAndUpdate(id, {date})
}

const deletePickup= async (id)=>{
return await Pickup.findByIdAndDelete(id).exec();
}

module.exports={
    create,
    getAllPickups,
    getAllPickupsByUser,
    updatePickup,
    deletePickup
}