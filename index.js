const express = require("express");
const morgan = require("morgan");
const productrouter=require('./routes/productroutes');
const userrouter=require('./routes/userroutes')

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use('/api/',productrouter.router);
server.use('/users/',userrouter.router);


server.listen(3000);
