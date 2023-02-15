const User = require("../../models/user").model;
const packageUsecases = require("../package");

const updateSubscription = async (data) => {
    const {userId, status, startDate} = data;
    const user = await User.findById(userId);
    user.subscription.status = status;
    user.subscription.startDate = startDate;
    const updatedUser = await User.findByIdAndUpdate(userId, user);
    return updatedUser;
}

const checkSubscriptionStatus = async (data) => {
    const {userId} = data;
    const user = await User.findById(userId);
    const userSubscriptionStatus = user.subscription.status;
    return userSubscriptionStatus;
}

const addPackage = async (data) => {
    const {userId, package} = data;
    const user = await User.findById(userId);
    user.subscription.packages.push(package);
    const updatedUser = await User.findByIdAndUpdate(userId, user);
    return updatedUser;
}

const removePackage = async (data) => {
    const {userId, packageIndex} = data;
    const user = await User.findById(userId);
    user.subscription.packages.splice(packageIndex, 1);
    const updatedUser = await User.findByIdAndUpdate(userId, user);
    return updatedUser;
};

const calcTotalFee = async (data) => {
    const {userId} = data;
    const user = await User.findById(userId);
    const remainingPackages = user.subscription.packages;
    const basePackageId = remainingPackages.shift();
    const baseFee = await packageUsecases.getFullPrice(basePackageId);
    const totalFee = await remainingPackages.reduce(
        (async (total, packageId) => {
            const packageFee = await packageUsecases.getExtraPrice(packageId);
            const totalFee = await total + packageFee;
            return(totalFee);
        }),
        baseFee
    );
    return totalFee;
};  

const calcInitialFee = async (data) => {
    const {userId} = data;
    const user = await User.findById(userId);
    const totalFee = await user.subscription.packages.reduce(
        (async (total, packageId) => {
            const packageFee = await packageUsecases.getInitialPrice(packageId);
            const totalFee = await total + packageFee;
            return(totalFee);
        }),
        0
    );
    return totalFee;
};  

module.exports = {
    updateSubscription,
    checkSubscriptionStatus,
    addPackage,
    removePackage,
    calcTotalFee,
    calcInitialFee,
};