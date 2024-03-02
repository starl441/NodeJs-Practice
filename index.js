require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const userrouter=require('./routes/userroutes')
const productrouter=require('./routes/productroutes');
const server = express();





server.use(express.json());
server.use(morgan("dev"));
server.use(express.static(process.env.PUBLIC_DIR))
server.use('/products',productrouter.router);
server.use('/users',userrouter.router);

console.log(process.env.PUBLIC,typeof(process.env.PUBLIC))
server.listen(process.env.PORT,()=>{
    console.log('server is running')
});
