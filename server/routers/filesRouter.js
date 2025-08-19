const { Router } = require("express");
const filesController = require("../controllers/filesController");
const authMiddleware = require("../middlewares/authMiddleware");
const filesRouter = Router();
// Get Route->api/files/ for retriving all the files of a user
filesRouter.get("/", authMiddleware, filesController.getFiles);

// Get Route->api/files/:fileId for getting a file of user
filesRouter.get("/:fileId", authMiddleware, filesController.getFile);

// Post Route->api/files for creating new file
filesRouter.post("/", authMiddleware, filesController.createFile);

//Put Route->api/files/:fileId for updating a file
filesRouter.put("/:fileId", authMiddleware, filesController.updateFile);

// Delete Route->api/files/:fileId for deleting a file
filesRouter.delete("/:fileId", authMiddleware, filesController.deleteFile);
module.exports = filesRouter;
