const User = require("../../models/user").model;

const updateSubscription = async (data) => {
    const {userId, status, startDate} = data;
    const user = await User.findById(user_id);
    user.subscription.status = status;
    user.subscription.startDate = startDate;
    const updatedUser = await User.findByIdAndUpdate(userId, user);
    return updatedUser;
}

const checkSubscriptionStatus = async (data) => {
    const {userId} = data;
    const userSubscriptionStatus = await User.findById(userId);
    return userSubscriptionStatus;
}

const addPackage = async (data) => {
    const {userId, package} = data;
    const user = await User.findById(user_id);
    const package_id = getNextFreeId(user.subscription.packages);
    const newPackage = {package_id, package};
    user.subscription.packages.push(newPackage);
    const updatedUser = await User.findByIdAndUpdate(userId, user);
    return updatedUser;
}

const removePackage = async (data) => {
    const {userId, packageId} = data;
    const user = await User.findById(userId);
    const packages = user.subscription.packages;
    const filteredPackages = packages.filter(package => packageId != packageId);
    user.subscription.packages = filteredPackages;
    const updatedUser = await User.findByIdAndUpdate(userId, user);
    return updatedUser;
};

const calcTotalFee = async () => {
    
    return 1000;
}

const getNextFreeId = (data) => {
    const {packagesArray} = data;
    let testId = 0;
    let found = false;
    while(testId <= packagesArray.length && !found){
        testId++;
        const filteredArray = packagesArray.filter(package => package.packageId == testId);
        found = filteredArray.length == 0;
    }
    return testId;
};


module.exports = {
    updateSubscription;
    checkSubscriptionStatus;
    addPackage;
    removePackage;
    calcTotalFee;
};