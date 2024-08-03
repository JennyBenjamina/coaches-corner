// import User from "../models/user.mjs";
import bcrypt from "bcrypt";
import Student from "../models/student.mjs";

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await Student.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //hash the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const newUser = new Student({
      username: user,
      password: hashedPwd,
      email: req.body.email,
      handicap: req.body.handicap,
      yearsPlayed: req.body.yearsPlayed,
      homeCourse: req.body.homeCourse,
      takenLessons: req.body.takenLessons,
      whatToImprove: req.body.whatToImprove,
      startDate: req.body.startDate,
      roles: req.body.roles,
    });

    await newUser.save();

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default handleNewUser;
