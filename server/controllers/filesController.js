const User = require("../models/userModel");
const File = require("../models/fileModel");
const createFile = async (req, res) => {
  console.log(req.body)
  const { name, language, roomId } = req.body;
  try {
    const existingFile = await File.findOne({
      name: name,
      room: roomId
    });
    if (existingFile) {
      return res.status(400).json({ message: "File already exist" });
    }
    const file = new File({
      name: name,
      room: roomId,
      language:language
    });
    await file.save();
    res.status(200).json({ message: `${name} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getFile = async (req, res) => {
  const { fileId } = req.params;
  try {
    const file = await File.findOne({ _id: fileId });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    return res.status(200).json({ file: file });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const updateFile = async (req, res) => {
  const { fileId } = req.params;
  const { name, content, language } = req.body;
  try {
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "File not exist" });
    }
    file.name = name;
    file.content = content;
    file.language = language;
    await file.save();
    return res.status(200).json({ message: `File ${fileId} updated` });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const deleteFile = async (req, res) => {
  const { fileId } = req.params;
  try {
    const file = await File.findById(fileId);
    if (!file) {
      return res.json({ message: "File not exist" });
    }
    await File.deleteOne({ _id: fileId });
    return res.status(200).json({ message: `Deleted ${fileId}` });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const getFiles = async (req, res) => {
  try {
    const { roomId } = req.body
    const files = await File.find({ roomId: roomId });
    return res.status(200).json({ files: files });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { createFile, getFile,getFiles, updateFile, deleteFile };
