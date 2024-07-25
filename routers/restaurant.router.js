const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controller");
const { authJwt } = require("../middleware");

//create a restaurant
//POST http://localhost:5000/api/v1/restaurants/
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdminOrMod],
  restaurantController.create
);

//Get All restaurants
router.get("/", restaurantController.getAll);

//Get restaurant by Id
router.get("/:id", [authJwt.verifyToken], restaurantController.getById);

//update a retaurant
router.get(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdminOrMod],
  restaurantController.update
);

//delete a restaurant
router.get(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  restaurantController.delete
);
module.exports = router;
