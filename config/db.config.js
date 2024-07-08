require ("dotenv").config();

module.exports = {
  HOST: "ep-empty-frog-a15ro460-pooler.ap-southeast-1.aws.neon.tech",
  USER: "default",
  PASSWORD: "nFYZ8GVXsy0U",
  DB: "verceldb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};