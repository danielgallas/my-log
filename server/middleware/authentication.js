const User = require("../models/User");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    next();
    // req.user = { userId: payload.userId, name: payload.name };
    // console.log(req.user);
  } catch (error) {
    console.log("NO ACCESS");
  }
};

module.exports = auth;
