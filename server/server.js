const express = require("express");
require("dotenv").config();
require("./config/db.js");
const authRouter = require("./routers/authRouter.js");
const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.listen(3000, () => console.log("server runnning on port 3000"));
