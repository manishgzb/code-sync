// const { Router } = require("express");
// const roomsRouter = Router();
// const {
//   createRoom,
//   getRooms,
//   getFiles,
//   createFile,
//   updateFile,
//   deleteFile,
//   renameFile,
// } = require("../controllers/roomsControllers.js");
// const jwtVerify = require("../middlewares/authMiddleware.js");
// roomsRouter.post("/", jwtVerify, createRoom);
// roomsRouter.get("/", jwtVerify, getRooms);
// roomsRouter.get("/:roomId/files", jwtVerify, getFiles);
// roomsRouter.post("/:roomId/files", jwtVerify, createFile);
// roomsRouter.put("/:roomId/files/:fileId", jwtVerify, updateFile);
// roomsRouter.delete("/:roomId/files/:fileId", jwtVerify, deleteFile);
// roomsRouter.put("/roomId/files/:fileId", jwtVerify, renameFile);
