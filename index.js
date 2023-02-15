const express = require("express");
const app = express();
const config = require("./src/lib/config");
const db = require("./src/lib/db");

const userUsecases = require("./src/usecases/user");
const packageUsecases = require("./src/usecases/package");
const pickupUsecases = require("./src/usecases/pickup");
const zoneUsecases = require("./src/usecases/zone");

app.use(express.json());

// Ejecutando el servidor HTTP
app.listen(config.app.port, async () => {
  console.log(`Esuchando peticiones HTTP en el puerto ${config.app.port}`);
  
  try {
    await db.connect();
    console.log("DB is connected 🤠");

    // const newUser = await userUsecases.create({email: "nuevo@asdf.com", password: "test1", firstName: "alguien", lastName: "más", phone: "1234123412", street: "irolo", number: 123, interior: 401, neighborhood: "zaca", municipality: "benito juarez", state: "cdmx", zipCode: 4000});
    // console.log(newUser);
    const userById = await userUsecases.findByEmail("nuevo@asdf.com");
    const user = userById.id;
    // const addedPet = await userUsecases.pets.addPet({userId: user, name: "rata", size: 1, species: 1})
    // const foundPet = await userUsecases.pets.getPet({userId: user, name: "alberto"});
    // console.log(foundPet);
    // const allPets = await userUsecases.pets.getAllPets({userId: user});
    // console.log(allPets);
    // const updatedPet = await userUsecases.pets.updatePet({userId: user, petId: 1, size:2})
    // console.log(updatedPet);
    // const deletedPet = await userUsecases.pets.delPet({userId: user, name: 'rata'});
    // console.log(deletedPet);


    // const user2 = await userUsecases.findByEmail("diegovm2");
    // const user3 = await userUsecases.findById(user);
    // console.log('usuario', user3);
    // user2.firstName = "asdfasdf";
    // const updatedUser = await userUsecases.update(user2.id, user2);
    // console.log(updatedUser);
    // const password = "test1";
    // console.log('uesrs', password);
    // const authentication = await userUsecases.authenticate("nuevo@asdf.com", password);
    // console.log(authentication);
    // const deletedUser = await userUsecases.del(user);
    // console.log(deletedUser);


    // const newPackage = await packageUsecases.create({name: "chico", volume: 6, pickupPeriod: 1, fullPrice: 100, extraPrice: 80, initialPrice: 200, description: "para dos perros chicos", picture: "nada"});
    // console.log(newPackage);
    const allPackages = await packageUsecases.getAll();
    // console.log(allPackages);
    const packageById = await packageUsecases.getById(allPackages[0].id);
    const package = packageById.id;
    // console.log(packageById);
    // packageById.name = 'otra cosa';
    // const updatedPackage = await packageUsecases.update(packageById.id, packageById);
    // console.log(updatedPackage);
    // const deletedPackage = await packageUsecases.del(packageById.id);
    // console.log(deletedPackage);

    // const date = new Date("2022-02-10");
    // const newPickup = await pickupUsecases.create({user, date});
    // console.log(newPickup);
    // const allPickups = await pickupUsecases.getAllPickups();
    // console.log(allPickups);
    // const allUserPickups = await pickupUsecases.getAllPickupsByUser(user);
    // console.log(allUserPickups);
    // const onePickup = allUserPickups[0];
    // console.log(onePickup);
    // onePickup.date = new Date("2022-02-10");
    // const updatedPickup = await pickupUsecases.updatePickup(onePickup.id, onePickup);
    // console.log(updatedPickup);
    // const deletedPickup = await pickupUsecases.deletePickup(onePickup.id);
    // console.log(updatedPickup);
    // const nextPickup = await pickupUsecases.getNextPickup(user2);
    // console.log("next pickup", nextPickup);
    // const lastPickup = await pickupUsecases.getLastPickup(user2);
    // console.log("last", lastPickup);
    // const pickupsByDate = await pickupUsecases.getPickupsByDate(new Date('2022-02-10'));
    // console.log(pickupsByDate);
    // const canceledPickup = await pickupUsecases.cancelPickup(allUserPickups[0].id);
    // console.log(canceledPickup);
    // const delayedPickup = await pickupUsecases.delayPickup(allUserPickups[1].2d);
    // console.log(delayedPickup);
    // const completedPickup = await pickupUsecases.completePickup(onePickup.id);
    // console.log(completedPickup);

    // const newZone = await zoneUsecases.create({name: "zona test 5",});
    // console.log(newZone);
    const allZones = await zoneUsecases.getAll({});
    // console.log(allZones);
    const zoneById = await zoneUsecases.getById(allZones[0].id);
    const zone = zoneById.id;
    // console.log(zoneById);
    // zoneById.name = "blabla";
    // const updatedZone = await zoneUsecases.update(zoneById.id, zoneById);
    // console.log(updatedZone);
    // const zoneId = zoneById.id;    const allPackages = await packageUsecases.getAll();
    // const zoneAddedSchedule = await zoneUsecases.schedules.addSchedule({zoneId, day: 1, time: 3});
    // console.log(zoneAddedSchedule);
    // const foundSchedule = await zoneUsecases.schedules.getSchedule({zoneId, day: 1, time: 1});
    // console.log(foundSchedule);
    // const allSchedules = await zoneUsecases.schedules.getAllSchedules({zoneId});
    // console.log(allSchedules);
    // const deletedSchedule = await zoneUsecases.schedules.delSchedule({zoneId, day: 1, time: 1});
    // console.log(deletedSchedule);
    // const deletedZone = await zoneUsecases.del(zoneById.id);
    // console.log(deletedZone);
    // const zoneZipCodes = await zoneUsecases.getZipCodes(zoneId);
    // console.log(zoneZipCodes);
    // const zoneSchedules = await zoneUsecases.getSchedules(zoneId);
    // console.log(zoneSchedules);
    // const zoneCheckedZipCode = await zoneUsecases.checkZipCode(4000);
    // console.log(zoneCheckedZipCode);
    // const zoneCheckedZipCode2 = await zoneUsecases.checkZipCode(3000);
    // console.log('no existe', zoneCheckedZipCode2);

    // const zoneAddedZipcCode = await zoneUsecases.zipCodes.addZipCode({zoneId, code: 3100});
    // const zoneAllZipCodes = await zoneUsecases.zipCodes.getAllZipCodes({zoneId});
    // console.log(zoneAllZipCodes);
    // const zoneDeletedZipCode = await zoneUsecases.zipCodes.delZipCode({zoneId, code: 3000})
    
    // const user_id = user._id;
    // const updated_user = await User.pets.updatePet({user_id, pet_id:2, name:'gustavo'})
    // console.log(updated_user)

    // const updatedSubscription = await userUsecases.subscription.updateSubscription({userId: user, status: 1, startDate: new Date("2022-10-2")});
    // console.log(updatedSubscription);
    // const subscriptionStatus = await userUsecases.subscription.checkSubscriptionStatus({userId: user});
    // console.log(subscriptionStatus);
    // const addedPackage = await userUsecases.subscription.addPackage({userId: user, package})
    // console.log(addedPackage);
    // const removedPackage = await userUsecases.subscription.removePackage({userId: user, packageIndex: 0})
    // console.log(removedPackage);
    // const totalFee = await userUsecases.subscription.calcTotalFee({userId: user});
    // console.log(totalFee);
    // const initialFee = await userUsecases.subscription.calcInitialFee({userId: user});
    // console.log('initial fee', initialFee);

    // const pickupPeriod = await userUsecases.pickupInfo.getPickupPeriod(user);
    // console.log(pickupPeriod);
    // const newPickupZone = await userUsecases.pickupInfo.setPickupZone({userId: user, zoneId: zone});
    // console.log(newPickupZone);
    // const pickupZone = await userUsecases.pickupInfo.getPickupZone(user);
    // console.log(pickupZone);
    // const newPickup = await userUsecases.pickupInfo.setPickup({userId: user, pickupDay: 1, pickupTime: 2});
    // console.log(newPickup);
    // const pickupDay = await userUsecases.pickupInfo.getPickupDay(user);
    // console.log(pickupDay);
    // const pickupTime = await userUsecases.pickupInfo.getPickupTime(user);
    // console.log(pickupTime);

    // const nextPickup = await userUsecases.pickups.getNextPickup(user);
    // console.log(nextPickup);
    // const lastPickup = await userUsecases.pickups.getLastPickup(user);
    // console.log(lastPickup);
    // const allPickups = await userUsecases.pickups.getAllPickups(user);
    // console.log(allPickups);
    // const newPickup = await userUsecases.pickups.completePickup(user);
    // console.log(newPickup);
    // const newNewPickup = await userUsecases.pickups.delayPickup(user);


    // const pickupPeriod = await userUsecases.pickupInfo.getPickupPeriod(user);
    // console.log(pickupPeriod);


  } catch (err) {
    console.error("Connection refused:", err);
  }
  // const status = await user.save();
  // console.log(status, "este es el estado");
});
