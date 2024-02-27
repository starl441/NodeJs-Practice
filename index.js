const express = require("express");
const fs = require("fs");
const morgan=require('morgan')



const server=express();

server.use(express.json())//request json parser
//server.use(express.static('public'))
server.use(morgan('dev'))//'default' in place of 'dev' for default log
const auth=(req,res,next)=>{
  // if(req.body.password===1234){
  //   res.json({stats:'Logged in'})
  //   next()
  // }
  // else{
  //   res.sendStatus(401);
  // }
  next()
}
server.use(auth)

server.get('/product/:id',(req,res)=>{
console.log(req.params)

 res.end('Hello world')
})

server.get('/',(req,res)=>{
  console.log(req.query)
})

server.listen(3000)