const jwt = require("jsonwebtoken");
const config = require("../config/auto.consfig");
const db = require("../models");
const User = db.User;

//verify token
verifyToken = (req,res,next)=>{
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({
            message:"No token provided!",
        });
    }
    jwt.verify(token, config.secret,(err, decoded)=>{
        if(err){
            return res.status(401).send({
                message:"Unauthorized!", 
            });
        }
        req.userId = decoded.id;
        next();
    });
};

//isAdmin?
isAdmin = (req,res,next) =>{
    //SELECT role FROM User WHERE id = userId
    User.findByPk(req.userId).then((user)=>{ 
        user.getRoles().then(roles=>{
                for(let i = 0; i < roles.length; i++){
                    if(roles[i].rolename === "admin"){
                        next();
                        return;
                    }
                }
            res.status(401).send({ 
            message: "Require Admin Role",
         });
        });
    });
};
//isMod
isAdminOrMod = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].rolename === "moderator") {
          next();
          return;
        }
      }
      res.status(401)
        .send({ message: "Unauthorized access, require Moderator Role!",

         });
    });
  });
};

//isAdminOrMod
isAdminOrMod = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (
            roles[i].rolename === "moderator" || 
            roles[i].rolename === "admin"
        ) {
          next();
          return;
        }
      }
     res.status(401).send({ 
        message: "Unauthorized access, require Moderator Role!",
     });
    });
  });
};


const authJwt = {
    verifyToken,
    isAdmin,
    isMod,
    isAdminOrMod,
};
module.exports= authJwt;