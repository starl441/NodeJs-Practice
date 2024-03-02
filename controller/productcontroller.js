// const fs = require("fs");
// const data = JSON.parse(fs.readFileSync("public/data.json", "utf-8"));
// const products = data.products;

const model = require("../Model/productsmodel");
const Product = model.Products;

exports.createproduct = (req, res) => {
  let products = new Product(req.body);
  products
    .save()
    .then((doc) => {
      console.log("Product saved successfully", doc);
      res.json(doc).status(200);
    })
    .catch((err) => {
      console.log("We faced an error", err);
      res.json({ error: err.message }).status(400);
    });
};

exports.readproduct1 = async (req, res) => {
  products = await Product.find({});
  res.json(products);
};

exports.readproduct2 = async (req, res) => {
  let product = await Product.find({ id: req.params.id });
  res.json(product);
};

exports.replaceproduct = async (req, res) => {
  let updatedproduct = req.body;
  products = await Product.findOneAndReplace(
    { id: req.params.id },
    updatedproduct
  );
  res.json(products);
};

exports.updateproduct = async (req, res) => {
  let updatedproduct = req.body;
  products = await Product.findOneAndUpdate(
    { id: req.params.id },
    updatedproduct
  );
  res.json(products);
};

exports.deleteproduct = async (req, res) => {
  try {
    products = await Product.findOneAndDelete({ id: req.params.id });
    res.json(products)
  } catch (err) {
    console.log(err);
    res.json(err)
  }
};
