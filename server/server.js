const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
require("./config/db.js");
const authRouter = require("./routers/authRouter.js");
const roomsRouter = require("./routers/roomsRouter.js");
const filesRouter = require("./routers/filesRouter.js");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
app.use(express.json());
app.use(express.json());
app.use("/auth", authRouter);
// app.use("/rooms", roomsRouter);
app.use("/api/files", filesRouter);
app.use("/api/rooms",roomsRouter)
io.on("connection", (socket) => {
  socket.on("file:code-update", (file) => {
    console.log(file);
    io.emit("file:code-updated", file);
  });
});
server.listen(3000, () => console.log("server runnning on port 3000"));
