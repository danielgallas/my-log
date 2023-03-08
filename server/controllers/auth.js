const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).send({ user });
  } catch (error) {
    res.status(400).send(error.errors);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  const user = await User.findOne({ username: username });
  const passwordMatch = await bcrypt.compare(password, user.password);
  res.send(passwordMatch);
};

module.exports = { register, login };
