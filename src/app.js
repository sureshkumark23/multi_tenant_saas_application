const express = require("express");
const authRoutes = require("./routes/authRoutes"); 

const workspaceRoutes = require("./routes/workspaceRoutes");
const projectRoutes = require("./routes/projectRoutes");

const taskRoutes = require("./routes/taskRoutes");


const app = express();


app.use("/api", taskRoutes);


app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/workspaces", projectRoutes);


app.use("/api/workspaces", workspaceRoutes);


module.exports = app;
