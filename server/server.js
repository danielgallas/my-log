const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");
const authRouter = require("./routes/auth");
const tasksRouter = require("./routes/tasks");
const authenticateUser = require("./middleware/authentication");

// middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", tasksRouter);

// app.use("/api/v1/tasks", authenticateUser, tasksRouter);

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
