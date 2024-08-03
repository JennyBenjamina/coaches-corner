// import User from "../models/user.mjs";
import Student from "../models/student.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await Student.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    try {
      const roles = Object.values(foundUser.roles).filter(Boolean);

      // create JWTs
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        // { expiresIn: "10s" }
        { expiresIn: "10d" }
      );

      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      // Saving refreshToken with current user
      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();
      console.log("result", result);

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
      console.log("refresh token", refreshToken);
      // Send authorization roles and access token to user
      res.json({
        roles,
        accessToken,
        isAuthenticated: true,
        // startDate: foundUser.startDate,
        // handicap: foundUser.handicap,
        // email: foundUser.email,
        // username: foundUser.username,
        id: foundUser._id,
        // homeCourse: foundUser.homeCourse,
        // yearsPlayed: foundUser.yearsPlayed,
        // takenLessons: foundUser.takenLessons,
        // whatToImprove: foundUser.whatToImprove,
      });
    } catch (err) {
      return res.sendStatus(504);
    }
  } else {
    res.sendStatus(401);
  }
};

export default handleLogin;
