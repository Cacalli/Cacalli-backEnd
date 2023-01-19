const User = require("../../models/user").model;

const updateSubscription = async (data) => {
    const {user_id, status, startDate} = data;
    const user = await User.findById(user_id);
    user.subscription.status = status;
    user.subscription.startDate = startDate;
    const updatedUser = await User.findByIdAndUpdate(user_id, user);
    return updatedUser;
}

const checkSubscriptionStatus = async (data) => {
    const {user_id} = data;
    const userSubscriptionStatus = await User.findById(user_id);
    return userSubscriptionStatus;
}

const addPackage = async (data) => {
    const {user_id, package};
    const user = await User.findById(user_id);
    const package_id = getNextFreeId(user.subscription.packages);
    const newPackage = {package_id, package};
    user.subscription.packages.push(newPackage);
    const updatedUser = await User.findByIdAndUpdate(user_id, user);
    return updatedUser;
}

const removePackage = async (data) => {
    const {user_id, package_id} = data;
    const user = await User.findById(user_id);
    const packages = user.subscription.packages;
    const filteredPackages = packages.filter(package => package_id != package_id);
    user.subscription.packages = filteredPackages;
    const updatedUser = await User.findByIdAndUpdate(user_id, user);
    return updatedUser;
};

const calcTotalFee = async () => {
    
    return 1000;
}

const getNextFreeId = (data) => {
    const {packagesArray} = data;
    let testId = 0;
    let found = false;
    while(idTest <= packagesArray.length && !found){
        testId++;
        const filteredArray = packagesArray.filter(package => package.package_id == testId);
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