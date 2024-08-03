import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("authHeader", authHeader);
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      }
      return res.sendStatus(403); // invalid token
    }

    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    console.log("decoded req user and roles", req.user, req.roles);
    next();
  });
};

export default verifyJWT;
