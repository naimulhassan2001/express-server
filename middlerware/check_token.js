const jwt = require("jsonwebtoken");
const express = require("express");

const token = express();

token.create = (data) => {
  const accessToken = jwt.sign(
    {
      name: data.name,
      _id: data._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return accessToken;
};

token.checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  console.log(authorization);

  if (authorization) {
    try {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = decoded;
      next();
    } catch {
      next("Authorization failure!");
    }
  } else {
    next("Authorization failure!");
  }
};

module.exports = token;
