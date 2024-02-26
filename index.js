const http = require("http");
const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"))




const server = http.createServer((req, res) => {
    if(req.url.startsWith("/product/")){
        let id=req.url.split('/')[2]
        console.log(typeof(id),id)
        let product=data.products[id-1];
        
        res.setHeader("Content-Type", "text/html");
        let updatedindex=index.replace("**title**",product.title)
        .replace("**thumbnail**",product.thumbnail)
        .replace("**price**",product.price)
        .replace("**description**",product.description)
        .replace("**brand**",product.brand)
        res.end(updatedindex);
    
        
    }
//   switch (req.url) {
//     case "/":
//       res.setHeader("Content-Type", "text/html");
//       res.end(index);
//       break;
//     case "/api":
//       res.setHeader("Content-Type", "application/JSON");
//       res.end(data);
//       break;

//     default:
//       res.writeHead(404);
//       res.end();
//   }
});

server.on("error", (error) => {
  console.error("Error starting the server:", error);
});

server.listen(8000, () => {
  console.log("Server listening on port 8000");
});
