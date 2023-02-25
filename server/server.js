const express = require("express")
const app = express()
const tasks = require("./routes/tasks")

// middleware
app.use("/api/v1/tasks", tasks)


app.listen(5000, ()=>{console.log("Server is running on port 5000")})