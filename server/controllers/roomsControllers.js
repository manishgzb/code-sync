// const Room = require("../models/roomModel");
// const User = require("../models/userModel");
// const createRoom = async (req, res) => {
//   const { roomName, secretKey } = req.body;
//   const user = await User.findOne({ email: req.user });
//   const room = new Room({
//     name: roomName,
//     secretKey: secretKey,
//     users: [user._id],
//     files: [],
//   });
//   await room.save();
// };
// const getRooms = (req, res) => {};
// const getFiles = (req, res) => {};
// const createFile = (req, res) => {};
// const updateFile = (req, res) => {};
// const deleteFile = (req, res) => {};
// const renameFile = (req, res) => {};
// module.exports = {
//   createRoom,
//   getRooms,
//   getFiles,
//   createFile,
//   updateFile,
//   deleteFile,
//   renameFile,
// };
