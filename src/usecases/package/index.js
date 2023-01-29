const Package = require("../../models/package").model;

const create = async (data) => {
    const {name, volume, pickupPeriod, fullPrice, extraPrice, description, picture} = data;
    const package = new Package({name, volume, pickupPeriod, fullPrice, extraPrice, description, picture});
    return await package.save();
};

const getById = async (id) => await Package.findById(id).exec();

const getAll = async ({}) => await Package.find({}).exec();

const update = async (id, data) => await Package.findByIdAndUpdate(id, data).exec();

const del = async (id) => await Package.findByIdAndDelete(id).exec();

module.exports = {
    create,
    getById,
    getAll,
    update,
    del,
};
