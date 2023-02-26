const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  id: String,
  entry: String,
  title: String,
  timestamp: String,
});

module.exports = mongoose.model("Task", TaskSchema);
