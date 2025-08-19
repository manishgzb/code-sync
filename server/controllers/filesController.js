const User = require("../models/userModel");
const File = require("../models/fileModel");
const createFile = async (req, res) => {
  const { fileName } = req.body;
  try {
    const user = await User.findOne({ email: req.user });
    const existingFile = await File.findOne({
      name: fileName,
      createdBy: user._id,
    });
    if (existingFile) {
      return res.status(400).json({ message: "File already exist" });
    }
    const file = new File({
      name: fileName,
      createdBy: user._id,
    });
    await file.save();
    user.files.push(file._id);
    await user.save();
    res.status(200).json({ message: `${fileName} created` });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getFiles = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user });
    const files = await File.find({ createdBy: user._id });
    return res.status(200).json({ files: files });
  } catch (err) {
    res.status(500).json({ message: "Something went worong" });
  }
};
const getFile = async (req, res) => {
  const { fileId } = req.params;
  try {
    const user = await User.findOne({ email: req.user });
    const file = await File.findOne({ _id: fileId });
    if (!file || file.createdBy != user._id) {
      return res.json({ message: "File not exist" });
    }
    return res.status(200).json({ file: file });
  } catch (e) {
    return res.json({ message: "Something went wrong" });
  }
};
const updateFile = async (req, res) => {
  const { fileId } = req.params;
  const { name, content, language, room } = req.body;
  try {
    const user = await User.findOne({ email: req.user });
    const file = await File.findById(fileId);
    if (!file || file.createdBy != user._id) {
      return res.json({ message: "File not exist" });
    }
    file.name = name;
    file.content = content;
    file.language = language;
    file.room = room;
    await file.save();
    return res.status(200).json({ message: `File ${fileId} updated` });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const deleteFile = async (req, res) => {
  const { fileId } = req.params;
  try {
    const user = await User.findOne({ email: req.user });
    const file = await File.findById(fileId);
    if (!file || file.createdBy != user._id) {
      return res.json({ message: "File not exist" });
    }
    await File.deleteOne({ _id: fileId });
    return res.status(200).json({ message: `Deleted ${fileId}` });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { createFile, getFiles, getFile, updateFile, deleteFile };
