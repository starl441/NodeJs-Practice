const mongoose = require("mongoose");
const { Schema } = mongoose;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://shiva:vVAMjeZVeMr4OLQJ@cluster0.vkcd0dl.mongodb.net/ecommerce"
  );
  console.log("Datbase Connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const productschema = new Schema({
  id: {type:Number,required:true},
  title: {type:String,required:[true,'Plese use strings bro...']},
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  categor: String,
  
  thumbnail: String,
  images: [String]
}); //model/schema

exports.Products = mongoose.model("products", productschema);
