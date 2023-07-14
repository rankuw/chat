const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "shhhhhhhh", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;