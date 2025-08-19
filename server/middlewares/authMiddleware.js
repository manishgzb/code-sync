const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json("Authorization header missing");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json("Token missing");
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthroized" });
    }
    req.user = decoded.user;
    next();
  });
};
module.exports = authMiddleware;
