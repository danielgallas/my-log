const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign(
      { username: user.username, password: user.password },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.status(200).send({ user: user.username, token });
  } catch (error) {
    res.status(400).send(error.errors);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  const passwordMatch = await bcrypt.compare(password, user.password);
  try {
    if (!passwordMatch) {
      throw new Error("incorrect password");
    }
    const token = jwt.sign(
      { username: user.username, password: user.password },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.status(200).send({ user: user.username, token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = { register, login };
