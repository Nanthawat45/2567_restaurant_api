const Restaurant = require("../models/restaurant.model");

//Create and Save a new restaurant
exports.create = async (req, res) => {
  const { name, type, imageUrl } = req.body;
  //Validate data
  if (!name || !type || !imageUrl) {
    res.status(400).send({
      message: "Name, Type or ImageUrl cannot be empty!",
    });
    return;
  }
  await Restaurant.findOne({ where: { name: name } })
    .then((restaurant) => {
      if (restaurant) {
        res.status(400).send({
          message: "Restaurant already exists",
        });
        return;
      }
      // create a restaurant
      const newRestaurant = {
        name: name,
        type: type,
        imageUrl: imageUrl,
      };
      Restaurant.create(newRestaurant)
        .then((data) => {
          res.send(data);
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              "Something error occurred while creating the restaurant",
          });
        });
    });
};

//Get all restaurants
exports.getAll = async (req, res) => {
  await Restaurant.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while retrieving restaurants.",
      });
    });
};

//Get restaurant by ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  await Restaurant.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No restaurant found with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while retrieving the restaurant.",
      });
    });
};

//Update a restaurant
exports.update = async (req, res) => {
  const id = req.params.id;
  await Restaurant.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Restaurant was updated successfully" });
      } else {
        res.send({
          message:
            "Cannot update restaurant with id=" +
            id +
            ". Maybe restaurant was not found or req.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while updating the restaurant.",
      });
    });
};

//Delete a restaurant
exports.delete = async (req, res) => {
  const id = req.params.id;
  await Restaurant.destroy({
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Restaurant was deleted successfully" });
      } else {
        res.send({
          message: "Cannot delete restaurant with id=" + id + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while deleting the restaurant.",
      });
    });
};
