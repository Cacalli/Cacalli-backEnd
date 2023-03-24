const User = require("../../models/user").model;
const packageUsecases = require("../package");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const createStripeCheckoutSession = async (data) => {
  const packages = await getCartPackages(data);
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: packages,
    success_url: 'https://master.d1vpqfv7zfjmvo.amplifyapp.com/pago-exitoso',
    cancel_url: 'https://master.d1vpqfv7zfjmvo.amplifyapp.com/pago-fallido',
  });
  return session.url;
};

const updateSubscription = async (data) => {
  const { userId, status, startDate, subscriptionStripeId, packages } = data;
  const user = await User.findById(userId);
  const formatDate = new Date(startDate*1000);
  if(status) { user.subscription.status = status; }
  if(startDate) {user.subscription.startDate = formatDate;}
  if(subscriptionStripeId) {user.subscription.subscriptionStripeId = subscriptionStripeId;}
  if(packages) {user.subscription.packages = packages}
  const updatedUser = await User.findByIdAndUpdate(userId, user);
  return updatedUser;
};

const checkSubscriptionStatus = async (data) => {
  const { userId } = data;
  const user = await User.findById(userId);
  const userSubscriptionStatus = user.subscription.status;
  return userSubscriptionStatus;
};

const getCartPackages = async (data) => {
  const packagesIds = data.body;
  const packages = await Promise.all(
    packagesIds.map(async (packageId) => {
      const package = await packageUsecases.getByPeriodAndSize(packageId);
      return {price: package[0].priceStripeId, quantity: packageId.quantity};
    })
  );
  return packages;
};

module.exports = {
  createStripeCheckoutSession,
  updateSubscription,
  checkSubscriptionStatus,
};
