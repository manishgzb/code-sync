const File = require("../models/fileModel");
const getFiles = async (req, res) => {
  try {
    const { roomId } = req.params;
    const files = await File.find({ room: roomId });
    return res.status(200).json({ files: files });
  } catch (err) {
    return res.status(500).json({message:err.message})
  }
};
module.exports = {getFiles}
