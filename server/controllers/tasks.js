const Task = require("../models/Task");

const getAllEntries = async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks });
};

const createNewEntry = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};

const getOneEntry = async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return res.send("no task with that id");
  } else {
    res.status(201).json({ task });
  }
};

const deleteEntry = async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.deleteOne({ _id: taskID });
  if (!task) {
    return res.send("no task with that id");
  } else {
    res.status(201).json({ task });
  }
};

const editEntry = async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body);
  if (!task) {
    return res.send("no task with that id");
  } else {
    res.status(201).json({ task });
  }
};

module.exports = {
  getAllEntries,
  createNewEntry,
  getOneEntry,
  deleteEntry,
  editEntry,
};
