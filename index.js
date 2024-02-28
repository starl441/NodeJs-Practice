const express = require("express");
const fs = require("fs");
const morgan=require('morgan');


const server=express();

server.use(express.json())
server.use(morgan('dev'))

const data = JSON.parse(fs.readFileSync('public/data.json', 'utf-8'))
const products=data.products;

//CRUD
//CREATE
server.post('/products',(req,res)=>{
  products.push(req.body)
  res.json(products)
})

//READ-1
server.get('/products',(req,res)=>{
  console.log(products)
  res.json(products)

})

//READ-2
server.get('/products/:id',(req,res)=>{
  let product=products[req.params.id-1]
  res.json(product)
})

//UPDATE
//Replaces
server.put('/products/:id',(req,res)=>{
  let updatedproduct=req.body
  
  products.splice(req.params.id,1,req.body)
  res.json(products)
})
//updates exisitng object
server.patch('/products/:id',(req,res)=>{
  let updatedproduct=req.body
  products.splice(req.params.id,1,{...products[req.params.id],...req.body})
  console.log({...products[req.params.id],...req.body})
  res.json(products)
})

//DELETE

server.listen(3000) 