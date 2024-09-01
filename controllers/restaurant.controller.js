const Restaurant = require("../models/restaurant.model");

//Create and Save a new Restaurant!
exports.create = async (req, res) => {
  const { name, type, imageUrl } = req.body;

  //Validate Data
  if (!name || !type || !imageUrl) {
    return res.status(400).send({
      message: "Name, Type or ImageUrl can not be empty!",
    });
  }

  await Restaurant.findOne({ where: { name: name } }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({
        message: "Restaurant Already Exists!",
      });
      return;
    }

    //Create a Restaurant
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
            "Something error occured while creating the restaurant.",
        });
      });
  });
};

//Get all restaurant
exports.getAll = async (req, res) => {
  await Restaurant.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occured while creating the restaurant.",
      });
    });
};

//Get By ID restaurant
exports.getById = async (req, res) => {
  const id = req.params.id;
  await Restaurant.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "No Found Restaurant with id " + id,
        });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occured while creating the restaurant.",
      });
    });
};

// Update a restaurant
exports.update = async (req, res) => {
  const id = req.params.id;
  await Restaurant.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Restaurant was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Restaurant with id=" +
            id +
            "Maybe Restaurant was not found or req.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred creating the restaurant.",
      });
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await Restaurant.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Restaurant was deleted successfully.",
        });
      } else {
        res.send({
          message: "Cannot delete Restaurant with id=" + id + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred creating the restaurant.",
      });
    });
};