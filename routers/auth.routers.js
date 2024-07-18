const express = require("express");
const router = express.Router();
const authRouter = require("../controllers/auth.controller");

//create a restaurant
//POST http://localhost:5000/api/v1/signup/
router.post("/signup", authRouter.signup);
router.post("/signup", authRouter.signin);

module.exports = router;
