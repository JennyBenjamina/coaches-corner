import Student from "../models/student.mjs";
import bcrypt from "bcrypt";

const getAllStudents = async (req, res) => {
  const students = await Student.find();
  if (!students) return res.status(204).json({ message: "No students found." });
  res.json(students);
};

// const createNewStudent = async (req, res) => {
//   // if (!req?.body?.username || !req?.body?.password) {
//   //   return res
//   //     .status(400)
//   //     .json({ message: "Username and Password are required" });
//   // }

//   try {
//     const result = await Student.create({
//       username: req.body.username,
//       lastname: req.body.password,
//       email: req.body.email,
//       refreshToken: req.body.refreshToken,
//       handicap: req.body.handicap,
//       yearsPlayed: req.body.yearsPlayed,
//       homeCourse: req.body.homeCourse,
//       takenLessons: req.body.takenLessons,
//       whatToImprove: req.body.whatToImprove,
//       startDate: req.body.startDate,
//     });

//     res.status(201).json(result);
//   } catch (err) {
//     console.error(err);
//   }
// };

// SAVE FOR WHEN COACH MAKES NEW STUDENT
const createNewStudent = async (req, res) => {
  console.log("inside createNewStudent");
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

const updateStudent = async (req, res) => {
  console.log("req.body", req.body);
  if (!req?.body?._id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const student = await Student.findOne({ _id: req.body._id }).exec();
  if (!student) {
    return res
      .status(204)
      .json({ message: `No students matches ID ${req.body._id}.` });
  }
  if (req.body?.username) student.username = req.body.username;
  if (req.body?.password) student.password = req.body.password;
  if (req.body?.refreshToken) student.refreshToken = req.body.refreshToken;
  if (req.body?.startDate) student.startDate = req.body.startDate;
  if (req.body?.handicap) student.handicap = req.body.handicap;
  if (req.body?.email) student.email = req.body.email;
  if (req.body?.yearsPlayed) student.yearsPlayed = req.body.yearsPlayed;
  if (req.body?.homeCourse) student.homeCourse = req.body.homeCourse;
  if (req.body?.takenLessons) student.takenLessons = req.body.takenLessons;
  if (req.body?.whatToImprove) student.whatToImprove = req.body.whatToImprove;
  if (req.body?.roles?.User) student.roles.User = req.body.roles.User;
  if (req.body?.roles?.Editor) student.roles.Editor = req.body.roles.Editor;
  if (req.body?.roles?.Admin) student.roles.Admin = req.body.roles.Admin;
  if (req.body?.profileImage) student.profileImage = req.body.profileImage;
  const result = await student.save();
  res.json(result);
};

const deleteStudent = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "student ID required." });

  const student = await Student.findOne({ _id: req.body.id }).exec();
  if (!student) {
    return res
      .status(204)
      .json({ message: `No student matches ID ${req.body.id}.` });
  }
  const result = await Student.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getStudent = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "student ID required." });
  }

  try {
    const student = await Student.findOne({ _id: req.params.id }).exec();
    if (!student) {
      return res
        .status(204)
        .json({ message: `No student matches ID ${req.params.id}.` });
    }

    res.json(student);
  } catch (err) {
    return res.status(400).json({ message: "Invalid student ID format." });
  }
};

export {
  getAllStudents,
  createNewStudent,
  updateStudent,
  deleteStudent,
  getStudent,
};
