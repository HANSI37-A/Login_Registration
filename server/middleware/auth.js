import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // ❌ no token
  if (!authHeader) {
    return res.status(401).json("No token");
  }

  // ✅ "Bearer token" → split කරලා token ගන්න
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json("Token missing");
  }

  try {
  const verified = jwt.verify(token, "secretkey"); // ✅ SAME
    req.user = verified;
    next();
  } catch (err) {
    console.log("JWT Error:", err.message); // 🔥 debug
    return res.status(403).json("Invalid token");
  }
};

export default verifyToken;