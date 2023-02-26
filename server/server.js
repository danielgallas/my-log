const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");

// middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/api/v1/tasks", tasks);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, () => {
      console.log(
        "Server is running on port 5000 and connected to the database"
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
