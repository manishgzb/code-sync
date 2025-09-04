const { Router } = require("express");
const roomsController = require('../controllers/roomsControllers')
const roomsRouter = Router();
roomsRouter.get("/:roomId/files",roomsController.getFiles)
module.exports = roomsRouter

