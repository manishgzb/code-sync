const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "javascript",
    },
    room: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
