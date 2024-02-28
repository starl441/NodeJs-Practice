const fs = require("fs");
const data = JSON.parse(fs.readFileSync("public/data.json", "utf-8"));
const users = data.users;

exports.createuser = (req, res) => {
  users.push(req.body);
  res.json(users);
};

exports.readuser1 = (req, res) => {
  console.log(users);
  res.json(users);
};

exports.readuser2 = (req, res) => {
  let user = users[req.params.id - 1];
  res.json(user);
};

exports.replaceuser = (req, res) => {
  let updateduser = req.body;

  users.splice(req.params.id - 1, 1, req.body);
  res.json(users);
};

exports.updateuser = (req, res) => {
  let updateduser = req.body;
  users.splice(req.params.id - 1, 1, {
    ...users[req.params.id],
    ...req.body,
  });
  console.log({ ...users[req.params.id], ...req.body });
  res.json(users);
};

exports.deleteuser = (req, res) => {
  users.splice(req.params.id - 1, 1);
  res.json(users);
};
