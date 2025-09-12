const mongoose = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence")(mongoose);
const EventSchema = mongoose.Schema(
  {
    eventName: String,
    data: {
      filename: String,
      _id:String,
      content: String,
    },
    room: String,
  },
  { timestamps: true }
);
EventSchema.plugin(AutoIncrementFactory, { inc_field: "id" });
const Event = mongoose.model("Event", EventSchema);
module.exports = { Event };
