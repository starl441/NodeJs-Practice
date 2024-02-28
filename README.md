Chapter-3: Express JS
In most cases we have pre-made middleware's but let us know how to build a custom middleware from scratch.
In express server there is importance for sequence of code.
server.get('/',(req,res)=>{
  res.json({type:'GET1'})
  
})
//When this callback gives the response it won't execute further

//The below are called API's or ENDPOINTS or Route .Remember we don't call these rest API's
server.get('/',(req,res)=>{
  res.json({type:'GET2'})

//GET1 is first printed and then GET2.
  

Middleware can be used for "logger" as well.

server.use((req,res,next)=>{
  console.log(new Date(),req.get('User-Agent'),req.method,req.ip,req.hostname)//Here req.get is different from server.get(which means get request) ,req.get basically gives us the access to attributes or information of the request payload from client or browser .
  next()//without using next() it won't redirect to other middlewares or API's 
})

In conclusion express server comprises basically comprises of request,middle ware, API endpoints & response.

There are different types of middle wares.
1.Application-level middle-ware: Every request and response for application will pass through this middle ware.
2.Router based middle ware: It is route specific. 
3.Static middle-ware: Static hosting is possible by using static middle ware. Static hosting means we can actually access the files like images,js files etc.., using browser url.
server.use(express.static('public');
//In this context static hosting the server won't do anything its not parsing it doing nothing its just giving the data to us to the client thats it .

//The root argument here in this context "public" specifies the root directory from which to serve static assets. The function determines the file to serve by combining req.url with the provided root directory. When a file is not found, instead of sending a 404 response, it calls next() to move on to the next middleware, allowing for stacking and fall-backs.

//Here when you search "localhost:8080/index.html" in browser url we will get index.html output BUT when we use  "localhost:8080/" we still get index.html file because .you see when the chrome requests '/' defaultly it will by default search for index.html file if it encounters static hosting first.so in our code before the api endpoint or route we have declared static hosting in middleware which makes it encounter middleware first then search for index.html file by default and since its there it will show if the file name is lets say "demo.html" it wouldn't have done that.
Application-level middleware & Router-level middleware:
Let us create a simple authentication middleware.We are going to use 'req.query' which we usually use for google searches temporarily for password but in reality it's not used like this its just for practice.
const auth=(req,res,next)=>{
  if(req.query.password==='123'){
    res.json({status:'Logged In'})
    next()
  }
  else{
    res.sendStatus(401);
  }
}

//server.use(auth)
//Here as we can see its an application level middleware since its going to get all the requests of application and authentication usually don't work like that we need to only get the authenticationn for login request only so we use "route level middlware" for this.ie.,

server.get('/',auth,(req,res)=>{
  res.json({type:'Logged In'})
  
})//Route level middlware

server.get('/',(req,res)=>{
  res.json({type:'GET2'})
  
})
server.post('/',(req,res)=>{
  res.json({type:'POST'})
})
server.listen(8000,()=>{
  console.log('server started')
})
Instead of doing everything manually express framework makes it easy to program a server.
Eg:
When you are dealing with "req.query" it will automatically convert the query which is string after "?" in browser into Json. If 'localhost:8000/home? Password=shiva' is the request. So we can directly access it using 'req.query.password',without express doing it we need to get the link split  it  and parse it to json manually.

Built-In Middlewares:
Remember In reality we don't usually authenticate and send password like this we send it hidden through "body" instead of "req.query" using "POST" method.
const express=require('express');

const server=express()

server.use(express.json())//built-in middlewares
//express.json() is called "body parser" without it we cannot use "body".It reads the json payloads.

server.use(express.static("public"))//built-in middlewares
//this is used to serve the static html,images etc., files.It by default redirects to "public" folder and IF there is index.html file its gives that file as a response and it only applies to files which are named index.html.Before this we need to create folder "public" and create files "index.html".


const auth=(req,res,next)=>{
  if(req.body.password==='123'){
    res.json({status:'Logged In'})
    next()//This is really important if it is not here it will not send response.
  }
  else{
    res.sendStatus(401);
  }
}

server.use(auth)

Note: 
Express doesn't directly access the request body like it does with query parameters (`req.query`). This is because the request body can come in different formats and encodings, making it more complex to handle directly within Express. Instead, Express relies on middleware functions to parse and handle the request body in a way that's more flexible and manageable.
Sure, let's break down each type of built-in middleware in Express:

1. **Static Middleware**: This middleware is used to serve static files, such as HTML, CSS, images, and JavaScript files, from a specific direcry on your server. It makes it easy to deliver files to the client without explicitly defining routes for each file.

   Example:
   ```javascript
   // Serving files from the "public" directory
   app.use(express.static('public'));
   ```
   With this setup, if you have a file named `styles.css` in the `public` directory, you can access it in the browser at `http://yourdomain.com/styles.css`.

2. **JSON Middleware**: This middleware is responsible for parsing incoming request bodies with JSON payloads. It automatically parses the JSON data and makes it available in `req.body` object for further processing by your application.

   Example:
   ```javascript
   // Parsing JSON request bodies
   app.use(express.json());
   ```
   Now, when a client sends a JSON payload in a POST request, you can access the parsed JSON data in `req.body`.

3. **URL Encoded Middleware**: This middleware parses incoming request bodies with URL-encoded payloads. It's commonly used when processing form data submitted by HTML forms with `application/x-www-form-urlencoded` encoding.

   Example:
   ```javascript
   // Parsing URL-encoded request bodies
   app.use(express.urlencoded({ extended: true }));
   ```
   Now, when a client submits a form with URL-encoded data, Express will parse it and make it available in `req.body`.

These built-in middlewares simplify common tasks like serving static files and handling different types of request data, allowing you to focus more on building your application logic.
ERROR HANDLING MIDDLEWARES:
THIRD-PARTY MIDDLEWARES:
If you want additional functionality, we also have third party middleware's in express documentation.

EG:
Morgan logger middleware
const express=require('express');
const morgan=require('morgan')
const server=express()

//"body parser"without it we cannot use "body"
server.use(express.json())

server.use(express.static("public"))

server.use(morgan('tiny'))//before using this we need to install seperate module npm install morgan

Summary:
We can send data in three ways from client to server:
req.params: The key of the url params is defined in the API end points in backend and value will be in url so both combined will be an object which is url params . Its best to use in amazon shopping's products and parameters are defined using ':' in backend code.
server.get('/product/:id',(req,res)=>{
  console.log(req.params)
  res.json({type:'GET2'})
  
})

//{ id: '3' } output
req.query: It's the data after '?' which sends in key vale pairs when you use express.
 You can also send some data to server using /demo?product=123. where product=123 is called query parameters.
req.body: We wilapl use it in forms and send data hidden.

ExpressJS is de-facto Node framework - and used in most Node applications which are used as web server.
You can install express npm install express
Express has few level of methods :
Application methods : e.g. app.use()
Request methods
Response methods
Middleware methods
Router methods
Response methods (res is our response objects)
res.send() - for sending HTML
res.sendFile() - for sending File
res.json - for sending JSON
res.sendStatus(404) - for sending HTTP status only
HTTP Request Types we generally use :
GET
POST
PUT
DELETE
PATCH
API / Endpoints / Routes are used inter-changeably but they are related to server paths.
Middle-ware : Modifies the request before it reaches the next middleware or endpoints.
Sequence of middleware is very important, as first middleware is first traversed by request.
Middle-wares can be used for many use cases, like loggers, authentication, parsing data etc.
Middle-ware can be :
Application level : server.use(middleware)
Router level : server.get('/', middleware, (req,res)=>{})
Built-in middleware : express.json() [ for parsing body data], express.static()[for static hosting]
External Middle-wares - like morgan
Request properties (req is our request object)
req.ip - IP address of client
req.method - HTTP method of request
req.hostname - like google.com / localhost
req.query - for capturing query parameters from URL e.g. localhost:8080 ? query=value
req.body -for capturing request body data (but its needs a middleware for body data decoding)
req.params - for capturing URL parameters for route path like /products/:id
Static Hosting : we can make 1 or more folders as static hosted using express.static middleware. server.use(express.static(< directory >)) Static hosting is like sharing a folder/directory and making its file readable as it is. Note : index.html is default file which would be read in a static hosted folder, if you don't mention any file name.
3 major ways of sending data from client to server via request are :
1. Send data via URL in Query String
This is easiest method to send data and mostly used in GET request.
When you have URL with ?name=Youstart&subject=express at end, it translates in a query string. In query string each key,value pair is separated by = and between 2 such pairs we put &.

To read such data in express you can use req.query :
server.get("/demo",function(req,res){
    console.log(req.query) // prints all data in request object
    res.send(req.query);  // send back same data in response object
})

2. Send data via Request Params
In this method you can have a URL with url path like /Youstart/express at end it translates in a param string. In param part string each value is separated by /. As you can see that URL only contains value not the key part of data. key part is decided by the endpoint definition at express server
server.get("/demo/:name/:subject",function(req,res){ console.log(req.params) // prints all data in request object res.send(req.query); // send back same data in response object })
So sequence of values matter in this case. As values sent from client are matched with name and subject params of URL later.

3. Send data via Request Body
F/96inal method of sending data is via body part of request. We can send data directly to body using URL. We have to either use one of these methods
Use a HTML Form and make method value as POST. This will make all name=value pair to go via body of request.
Use special browsers like POSTMAN to change the body directly. (We will see this example in next classes)
server.post("/demo",function(req,res){console.log(req.body) // prints all data in request objectres.send(req.body);  // send back same data in response object})

Summary:
server.get('/login/:password/:user',(req,res)=>{
    //console.log(req.query) this is used for query params method of sending data from browser where in key value pairs divided by & request is sent.
    console.log('------------+++++++')
    console.log(req.params)//this is used for param string method of sending data from browser where data is sent sequential only values divided by '/'
res.json({'Name':'shivashankar'})
})

