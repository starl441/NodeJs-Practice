const fs = require("fs");
const data = JSON.parse(fs.readFileSync("public/data.json", "utf-8"));
const products = data.products;

exports.createproduct = (req, res) => {
  products.push(req.body);
  res.json(products);
};

exports.readproduct1 = (req, res) => {
  console.log(products);
  res.json(products);
};

exports.readproduct2 = (req, res) => {
  let product = products[req.params.id - 1];
  res.json(product);
};

exports.replaceproduct = (req, res) => {
  let updatedproduct = req.body;

  products.splice(req.params.id - 1, 1, req.body);
  res.json(products);
};

exports.updateproduct = (req, res) => {
  let updatedproduct = req.body;
  products.splice(req.params.id - 1, 1, {
    ...products[req.params.id],
    ...req.body,
  });
  console.log({ ...products[req.params.id], ...req.body });
  res.json(products);
};

exports.deleteproduct = (req, res) => {
  products.splice(req.params.id - 1, 1);
  res.json(products);
};
