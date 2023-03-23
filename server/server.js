const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");
const authRouter = require("./routes/auth");
const tasksRouter = require("./routes/tasks");
const authenticateUser = require("./middleware/authentication");

const port = process.env.PORT || 5000;

// middleware
app.use(cors({ origin: "https://my-log.netlify.app" }));
app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", authenticateUser, tasksRouter);

// app.use("/api/v1/tasks", authenticateUser, tasksRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(
        "Server is running on port 5000 and connected to the database"
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
