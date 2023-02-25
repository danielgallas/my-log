const mongoose = require("mongoose");

// getting rid of a deprication warning
mongoose.set("strictQuery", false);

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
