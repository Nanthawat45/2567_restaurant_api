const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("user", {
  UserName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserPASSWORD: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports = User;
