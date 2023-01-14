const Pickup= require("../../models/pickup").model;

const create=async(date,user)=>{
    const newPickup= new Pickup({date,user});

    return await newPickup.save();
};

const getNextPickup=async(user)=>{
    await Pickup.find({user})
}

const getLastPickup = async ()=>{

}

const getAllPickups = async ()=>{

}

const updatePickup = async ()=>{

}

const deletePickup= async ()=>{

}

module.exports={
    create
}