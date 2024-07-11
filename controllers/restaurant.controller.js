const Restaurant = require("../models/restaurant.model")

//Create and Save a new restaurant
 exports.create = async (req, res)=>{
    const {name, type, imageUrl} = req.body;
    //Validate data
    if(!name || !type || !imageUrl){
        res.status(400).send({
            massage:"Name, Type or ImageUrl can not be empty!",
        });
        return;
    }
    await Restaurant.findOne({where:{name:name}}).then((restaurant)=>{
        if(restaurant){
            res.status(400).send({
                massage: "Restaurant already exists"
            });
            return;
        }
        // create a restaurant
        const newRestaurant ={
            name: name,
            type: type,
            imageUrl: imageUrl,
        };
        Restaurant.create(newRestaurant).then((data)=>{
            res.send(data);
        }).catch((error)=>{
            res.status(500).send({
                message: error.message || 
                "Something error occured while creating the restaurant",
            })
        })
    })
 }
 
 //Get all restaurant
 exports.getAll = async (req, res)=> {
    await Restaurant.findAll()
    .then((data)=>{
        res.send(data);
    })
    .catch((error)=>{
        res.status(500).send({
            message:
            error.massage || "Something error occured while creating the restaurant.",
        });
    })
 }

 //Get By ID
 exports.getById = async (req, res)=>{
    const id = req.params.id;
    await Restaurant.findByPk(id)
    .then((data)=>{
        if(!data){
            res.status(404).send({ message: "NO found Restaurant with id" + id })
        } else {
            res.send(data);
        }
    })
    .catch((error) =>{
        res.status(500).send({
            message:error.massage || "Something error occured while creating restaurant.",
        });
    });
 };

 //Update a restaurant
 exports.update = async (req, res)=>{
    const id = req.params.id;
    await Restaurant.update(req.body,{
        where:{
            id: id,
        },
    }).then((num)=>{
        if(num==1){
            res.send({message:"Restaurant was update successfully"})
        }else{
            res.send({message:"Cannot updata restaurant with id=" +
            id +
            ". Maybe restaurant was not found or req.body is empty!",
        });
        }
    })
    .catch((error) => {
        res.status(500).send({
            message:
            error.massage || "Something error occured while creating the restaurant.",
        });
    })
 };

 //delete a restaurant
 exports.delete = async(req, res)=>{
    const id = req.params.id;
    await Restaurant.delete({
      where: {
        id: id,
      },
    })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "Restaurant was update successfully" });
        } else {
          res.send({
            message:
              "Cannot updata restaurant with id=" + id +".",
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.massage ||
            "Something error occured while creating the restaurant.",
        });
      });
 }