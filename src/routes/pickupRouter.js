const express = require("express");
const routes= express.Router();

const {
    create,
    getAllPickups,
    getAllPickupsByUser,
    updatePickup,
    deletePickup
} = require("../usecases/pickup")


