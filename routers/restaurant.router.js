const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controller");

//create a restaurant
//POST http://localhost:5000/api/v1/restuarants/
router.post("/", restaurantController.create);

//Get All restaurant
router.get("/", restaurantController.getAll);

//Get All restaurant by Id
router.get("/:id", restaurantController.getById);

module.exports = router;