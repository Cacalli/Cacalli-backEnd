const Package = require("../../models/package").model;

const create = async (data) => {
    const {name, volume, pickupPeriod, fullPrice, extraPrice, initialPrice, description, picture} = data;
    const package = new Package({name, volume, pickupPeriod, fullPrice, extraPrice, initialPrice, description, picture});
    return await package.save();
};

const getById = async (id) => await Package.findById(id).exec();

const getAll = async () => await Package.find({}).exec();

const getByPeriod = async (period) => await Package.find({pickupPeriod: period}).exec();

const update = async (id, data) => await Package.findByIdAndUpdate(id, data).exec();

const del = async (id) => await Package.findByIdAndDelete(id).exec();

const getFullPrice = async (id) => {
    const package = await Package.findById(id);
    const price = package.fullPrice;
    return price;
};

const getExtraPrice = async (id) => {
    const package = await Package.findById(id);
    const price = package.extraPrice;
    return price;
};

const getInitialPrice = async (id) => {
    const package = await Package.findById(id);
    const price = package.initialPrice;
    return price;
};

module.exports = {
    create,
    getById,
    getAll,
    getByPeriod,
    update,
    del,
    getFullPrice, 
    getExtraPrice,
    getInitialPrice,
};
