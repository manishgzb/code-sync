const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
require("./config/db.js");
const { Event } = require("./models/eventModel.js");
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
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
  },
  cors: {
    origin: "http://localhost:5173",
  },
});
app.use(express.json());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/api/files", filesRouter);
app.use("/api/rooms", roomsRouter);
io.on("connection", async (socket) => {
  const { roomId } = socket.handshake.auth;
  console.log(roomId);
  socket.join(roomId);
  // console.log(socket.handshake.auth)
  socket.on("file:code-update", async (file) => {
    // const event = new Event({
    //   eventName: "file:code-update",
    //   room: "room1",
    //   data: { filename: file.name, _id: file._id, content: file.content },
    // });
    // await event.save();
    console.log(file.content);
    io.to(roomId).emit("file:code-updated", file);
  });
  socket.on("file:create", () => {
    io.emit("file:created");
  });
  socket.on("file:delete", () => {
    io.emit("file:deleted");
  });
  // if (!socket.recovered) {
  //   try {
  //     const events = await Event.find({
  //       id: { $gt: socket.handshake.auth.serverOffset || 0 },
  //     });
  //     events.forEach((event) => {
  //       console.log(event.eventName)
  //       socket.to(roomId).emit("file:code-updated", event.data, event.id);
  //     });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }
});
server.listen(3000, () => console.log("server runnning on port 3000"));
