const Task = require("../models/Task");

const getAllEntries = (req, res) => {
  res.send("getting all entries");
};

const createNewEntry = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};

const getOneEntry = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.send(id);
};

module.exports = {
  getAllEntries,
  createNewEntry,
  getOneEntry,
};
