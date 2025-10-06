const File = require("../models/fileModel");
const Room = require("../models/roomModel");

const getFiles = async (req, res) => {
  try {
    const { roomId } = req.params;
    const files = await File.find({ room: roomId });
    return res.status(200).json({ files: files });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const createRoom = async (req, res) => {
  try {
    const { roomName, password } = req.body;
    const room = new Room({
      name: roomName,
      password: password,
    });
    await room.save();
    return res.status(200).json({ room: { id: room._id, name: room.name } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports = { getFiles, createRoom };
