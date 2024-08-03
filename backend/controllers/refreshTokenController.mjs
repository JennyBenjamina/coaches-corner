// import User from "../models/user.mjs";
import Student from "../models/student.mjs";
import jwt from "jsonwebtoken";

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await Student.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    res.json({
      roles,
      accessToken,
      isAuthenticated: true,
      startDate: foundUser.startDate,
      handicap: foundUser.handicap,
      email: foundUser.email,
      username: foundUser.username,
      id: foundUser.id,
      homeCourse: foundUser.homeCourse,
      yearsPlayed: foundUser.yearsPlayed,
      takenLessons: foundUser.takenLessons,
      whatToImprove: foundUser.whatToImprove,
    });
  });
};

export default handleRefreshToken;
