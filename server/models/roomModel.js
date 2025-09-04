const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  name: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],
  folders:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Folder'
    }
  ],
  secretKey: String,
});
const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
