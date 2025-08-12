const jwt = require("jsonwebtoken");
const jwtVerify = (req, res, next) => {
  const authHeader = req.headers["Authorizatioon"];
  const token = authHeader.split("")[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthroized" });
    }
    req.user = decoded.user;
    next();
  });
};
module.exports = jwtVerify;
