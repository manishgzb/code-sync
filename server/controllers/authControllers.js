const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ message: "User not registred" });
  }
  await bcrypt.compare(password, user.password).then((result) => {
    if (result != true) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }
  });
  const token = await jwt.sign(
    { user: { id: user._id, name: user.name } },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  return res.status(200).json({ token });
};
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (user) {
    return res.status(409).json({ message: "User already registred" });
  }
  let hashPassword;
  await bcrypt
    .hash(password, 10)
    .then((hash) => {
      hashPassword = hash;
    })
    .catch((err) => {
      return res.status(500).json({ message: "Something went wrong" });
    });
  user = new User({ name: name, email: email, password: hashPassword });
  await user.save();
  return res.status(200).json({ message: "User registration sucess" });
};
module.exports = { login, signup };
