const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  id: String,
  entry: String,
  title: String,
  timestamp: {
    type: String,
    default: "February 2023",
  },
});

module.exports = mongoose.model("Task", TaskSchema);
