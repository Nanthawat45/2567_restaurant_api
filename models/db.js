const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: 'localhost',
  dialect: dbConfig.dialect,
  diaalectOptions:{
  ssl:{
    require:true,
    rejectUnauthorized:false,
 }, 
},
});

testConnection =async ()=>{
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
}
testConnection();
module.exports = sequelize;

