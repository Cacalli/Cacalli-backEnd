const User = require("../../models/user").model;

const addPet = async (data) => {
    const {userId, name, size, species} = data;
    const user = await User.findById(userId);
    const petId = getNextFreeId({petsArray: user.pets});
    user.pets.push({petId, name, size, species});
    const newPetUser = await User.findByIdAndUpdate(userId, user);
    return newPetUser;
}; 

const getPet = async (data) => {
    const {userId, name} = data;
    const user = await User.findById(userId);
    const pet = user.pets.find(item => item.name == name);
    return pet;
};

const getAllPets = async (data) => {
    const {userId} = data;
    const user = await User.findById(userId);
    const pets = user.pets;
    return pets;
};

const updatePet = async (data) => {
    const {userId, petId, name, size, species} = data;
    const user = await User.findById(userId);
    const petIndex = user.pets.findIndex(item => item.petId == petId);
    user.pets[petIndex].name = name ? name : user.pets[petIndex].name;
    user.pets[petIndex].species = species ? species : user.pets[petIndex].species;
    user.pets[petIndex].size = size ? size : user.pets[petIndex].size;
    const updated_pet_user = await User.findByIdAndUpdate(userId, user);
    return updated_pet_user;
};

const delPet = async (data) => {
    const {userId, name} = data;
    const user = await User.findById(userId);
    user.pets = user.pets.filter(item => item.name != name);
    const updatedUser = await User.findByIdAndUpdate(userId, user);
    return updatedUser;
};

const getNextFreeId = (data) => {
    const {petsArray} = data;
    let testId = 0;
    let found = false;
    while(testId <= petsArray.length && !found){
        testId++;
        const filteredArray = petsArray.filter(pet => pet.petId == testId);
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