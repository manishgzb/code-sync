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
app.use("/api/auth", authRouter);
app.use("/api/files", filesRouter);
app.use("/api/rooms", roomsRouter);
const rooms = {};
io.on("connection", async (socket) => {
  const { roomId, user } = socket.handshake.auth;
  socket.join(roomId);
  if (!rooms[roomId]) {
    rooms[roomId] = [];
  }
  rooms[roomId].push({ socketId: socket.id, user });
  io.to(roomId).emit(
    "room:users",
    rooms[roomId].map((u) => u.user)
  );
  socket.on("sync-step-1", (roomId, stateVector) => {
    socket.to(roomId).emit("sync-step-1", stateVector);
  });

  socket.on("sync-step-2", (roomId, update) => {
    socket.to(roomId).emit("sync-step-2", update);
  });

  socket.on("update", (roomId, update) => {
    socket.to(roomId).emit("update", update);
  });
  socket.on("awareness", (roomId, update) => {
    socket.to(roomId).emit("awareness", update);
  });
  socket.on("request-awareness", () => {
    socket.to(roomId).emit("request-awareness");
  });
  socket.on("file:create", () => {
    io.to(roomId).emit("file:created");
  });
  socket.on("file:delete", () => {
    io.to(roomId).emit("file:deleted");
  });
  socket.on("user:typing", () => {
    io.emit("user:typing", user);
  });
  socket.on("disconnect", () => {
    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter((u) => u.socketId !== socket.id);
      io.to(roomId).emit(
        "room:users",
        rooms[roomId].map((u) => u.user)
      );
    }
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
