
const express=require('express')
const controller = require("../controller/productcontroller");

let router=express.Router();

router
  .post("/", controller.createproduct)

  //READ-1
  .get("/products", controller.readproduct1)

  //READ-2
  .get("/products/:id", controller.readproduct2)

  //UPDATE
  //Replaces
  .put("/products/:id", controller.replaceproduct)
  //updates exisitng object
  .patch("/products/:id", controller.updateproduct)

  //DELETE
  .delete("/products/:id", controller.deleteproduct);


exports.router=router