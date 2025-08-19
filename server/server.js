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
app.use(cors());
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
app.use("/file", filesRouter);
io.on("connection", (socket) => {
  console.log("a user connected");
});
server.listen(3000, () => console.log("server runnning on port 3000"));
