const config =require("../config/auth.consfig");
const db = require("../models");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {Op} = require("sequelize");

//Register a new user
exports.signup = async (req, res) =>{
    const {username, email, password} = req.body;
    if(!username || !email ||!password){
        req.status(400).send({
            message: "Please provid all required fields"
        });
        return;
    }

    //Prepare user data
    const newUser={
        username:username,
        email:email,
        password:bcrypt.hashSync(password, 123456789)
    };

    //Save user in the database
    await User.create(newUser).then((user)=>{
        if(req.body.roles){
            Role.findAll({
                where:{
                    name: {[Op.or]:body.roles},
                },
            }).then((roles)=>{
                user.setRoles(roles).then(()=>{
                    res.send({
                        message:"User registered successfully!"
                    })
                })
            });
        }else{
            //set defautl role to "user" id=1
            user.setRoles([1]).then(() => {
              res.send({
                message: "User registered successfully!",
              });
            });
        }
    }).catch((error)=>{
        res.status(500).send({
        message: 
        error.message || "Something error occured while registering a new user.",
   }); 
});

}
