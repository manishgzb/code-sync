const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(process.env.DB_URL).then(()=>console.log("connected"))
module.exports = connection
