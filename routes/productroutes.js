
const express=require('express')
const controller = require("../controller/productcontroller");

let router=express.Router();

router
  .post("/", controller.createproduct)

  //READ-1
  .get("/", controller.readproduct1)

  //READ-2
  .get("/:id", controller.readproduct2)

  //UPDATE
  //Replaces
  .put("/:id", controller.replaceproduct)
  //updates exisitng object
  .patch("/:id", controller.updateproduct)

  //DELETE
  .delete("/:id", controller.deleteproduct);


exports.router=router