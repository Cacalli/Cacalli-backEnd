const Package = require("../../models/package").model;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const create = async (data) => {
  const {
    name,
    volume,
    pickupPeriod,
    fullPrice,
    extraPrice,
    initialPrice,
    description,
    picture,
  } = data;

  const product = await stripe.products.create({
    name,
  });

  const productStripeId = product.id;

  const price = await stripe.prices.create({
    unit_amount: fullPrice,
    currency: "mxn",
    recurring: { interval: "month" },
    product: productStripeId,
  });

  const priceStripeId = price.Id;

  const package = new Package({
    name,
    volume,
    pickupPeriod,
    fullPrice,
    extraPrice,
    initialPrice,
    description,
    picture,
    productStripeId,
    priceStripeId,
  });
  return await package.save();
};

const getById = async (id) => await Package.findById(id).exec();

const getAll = async () => await Package.find({}).exec();

const getByPeriod = async (period) =>
  await Package.find({ pickupPeriod: period }).exec();

const update = async (id, data) =>
  await Package.findByIdAndUpdate(id, data).exec();

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
