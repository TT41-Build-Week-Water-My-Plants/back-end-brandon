//once done with the auth model all of these are basically the same since we dont need to join the tables.

const db = require("../data/db-config");

//returns all the plants within the database(seeds will be shown)
const getAllPlants = () => {
  return db("plants");
};
//this will return any plants with that specified id
const getPlantById = (plant_id) => {
  return db("plants").where("plant_id", plant_id).first();
};
//this allows you to add a new plant to the database if these fields are inserted
const addPlant = (plant) => {
  return db("plants").insert(plant, [
    "plant_id",
    "nickname",
    "species",
    "h2o_frequency",
    "image",
  ]);
};
//this allows you to update a plant if these fields are met(image not required)
const updatePlant = async (id, plant) => {
  return db("plants")
    .where("plant_id", id)
    .update(plant, [
      "plant_id",
      "nickname",
      "species",
      "h2o_frequency",
      "image",
    ]);
};
//allows you target a specified plant within the database using plant_id and delete it
const deletePlant = async (plant_id) => {
  return db("plants").where("plant_id", plant_id).del();
};

module.exports = {
  getAllPlants,
  getPlantById,
  addPlant,
  updatePlant,
  deletePlant,
};
