const { DataType, DataTypes } = require("sequelize");
const sequelize = require("./db");

const Restaurant = sequelize.define("restaurant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ImageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Restaurant.sync({ force: true })
  .then(() => {
    console.log("Table created or already exists");
  })
  .catch((error) => {
    console.log("Error creating table:", error);
  });
module.exports = Restaurant;
