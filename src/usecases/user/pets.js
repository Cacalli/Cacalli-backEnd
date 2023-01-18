const User = require("../../models/user").model;

const addPet = async (data) => {
    const {user_id, name, size, species} = data;
    const user = await User.findById(user_id);
    const pet_id = getNextFreeId(user.pets)
    user.pets.push({pet_id, name, size, species});
    const new_pet_user = await User.findByIdAndUpdate(user_id, user);
    return new_pet_user;
}; 

const getPet = async (data) => {
    const {user_id, name} = data;
    const user = await User.findById(user_id);
    const pet = user.pets.find(item => item.name = name);
    return pet;
};

const getAllPets = async (data) => {
    const {user_id} = data;
    const user = await User.findById(user_id);
    const pets = user.pets;
    return pets;
};

const updatePet = async (data) => {
    const {user_id, pet_id, name, size, species} = data;
    const user = await User.findById(user_id);
    const pet_index = user.pets.findIndex(item => item.pet_id == pet_id);
    user.pets[pet_index].name = name ? name : user.pets[pet_index].name;
    user.pets[pet_index].species = species ? species : user.pets[pet_index].species;
    user.pets[pet_index].size = size ? size : user.pets[pet_index].size;
    const updated_pet_user = await User.findByIdAndUpdate(user_id, user);
    return updated_pet_user;
};

const delPet = async (data) => {
    const {user_id, name} = data;
    const user = await User.findById(user_id);
    user.pets = user.pets.filter(item => item.name != name);
    const updated_user = await User.findByIdAndUpdate(user_id, user);
    return updated_user;
};

const getNextFreeId = (data) => {
    const {petsArray} = data;
    let testId = 0;
    let found = false;
    while(idTest <= petsArray.length && !found){
        testId++;
        const filteredArray = petsArray.filter(pet => pet.pet_id == testId);
        found = filteredArray.length == 0;
    }
    return testId;
};

module.exports = {
    addPet,
    getPet,
    getAllPets,
    updatePet,
    delPet,
};