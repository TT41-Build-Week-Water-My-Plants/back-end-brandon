const router = require("express").Router();
const Plant = require("./plants-model");
const { validatePlantById, checkPlantPayload } = require("./plants-middleware");
const restricted = require("../restricted/restricted");

router.get("/", restricted, (req, res, next) => {
  Plant.getAllPlants()
    .then((plants) => {
      res.status(200).json(plants);
    })
    .catch(next);
});

router.get("/:id", restricted, validatePlantById, (req, res, next) => {
  Plant.getPlantById(req.params.id)
    .then((plantWithId) => {
      res.status(200).json(plantWithId);
    })
    .catch(next);
});

//this is where an axios.post can be used for putting in a new plant,but they need a token so use axiosWithAuth()
router.post("/", restricted, checkPlantPayload, (req, res, next) => {
  Plant.addPlant()
    .then((newPlant) => {
      res.status(201).json(newPlant);
    })
    .catch(next);
});

//this is where they can update the plant with a specified id(so grab a plant then edit it)

router.put(
  "/:id",
  restricted,
  validatePlantById,
  checkPlantPayload,
  (req, res, next) => {
    Plant.updatePlant(req.params.id, req.body)
      .then((updatedPlant) => {
        res.status(200).json(updatedPlant);
      })
      .catch(next);
  }
);
//there is no payload to return since it is deleted so im just returning a message
router.delete("/:id", restricted, validatePlantById, (req, res, next) => {
  Plant.deletePlant(req.params.id)
    .then(() => {
      res.status(200).json({
        message: `plant with id: ${req.params.id} has been deleted`,
      });
    })
    .catch(next);
});

router.use((err, req, res) => {
  res.status(500).json({
    message: "check server inside plants",
  });
});
