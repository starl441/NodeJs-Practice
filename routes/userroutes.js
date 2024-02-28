
const express=require('express')
const controller = require("../controller/usercontroller");

let router=express.Router();

router
  .post("/", controller.createuser)

  //READ-1
  .get("/", controller.readuser1)

  //READ-2
  .get("/:id", controller.readuser2)

  //UPDATE
  //Replaces
  .put("/:id", controller.replaceuser)
  //updates exisitng object
  .patch("/:id", controller.updateuser)

  //DELETE
  .delete("/:id", controller.deleteuser);


exports.router=router