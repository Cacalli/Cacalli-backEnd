const express = require("express");
const app = express();
const config = require("./src/lib/config");
const db = require("./src/lib/db");

const User = require("./src/usecases/user")

app.use(express.json());

  // Ejecutando el servidor HTTP
app.listen(config.app.port, async () => {
  console.log(`Esuchando peticiones HTTP en el puerto ${config.app.port}`);
  
  try {
    await db.connect();
    console.log("DB is connected 🤠");
    //const user_creation = await User.create({email:'papasflacas@supercalamar.com', password:'mes_trece', firstName:'Diego', lastName:'Viganu', phone:'12341234', street:'periferico', number:1234, interior: 1, neighborhood:'uno', municipality:'coyoacan', state:'cdmx', zipCode:4000})
    //console.log(user_creation)
    const user = await User.findByEmail("papasflacas@supercalamar.com");
    const user_id = user._id;
    //console.log(user)
    //const add_pets = await User.pets.addPet({user_id, pet_id:1, name:'norris2', size:3, species:2})
    //const pet = await User.pets.delPet({user_id, name:'norris2'});
    const updated_user = await User.pets.updatePet({user_id, pet_id:2, name:'gustavo'})
    console.log(updated_user)
  } catch (err) {
    console.error("Connection refused:", err);
  }
});