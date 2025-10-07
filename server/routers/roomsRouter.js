const { Router } = require("express");
const roomsController = require('../controllers/roomsControllers')
const roomsRouter = Router();
roomsRouter.post("/",roomsController.createRoom)
roomsRouter.get("/:roomId/files",roomsController.getFiles)
roomsRouter.get("/:roomId",roomsController.getRoom)
module.exports = roomsRouter

