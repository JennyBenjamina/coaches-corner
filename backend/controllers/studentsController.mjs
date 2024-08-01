import Student from "../models/student.mjs";

const getAllStudents = async (req, res) => {
  const students = await Student.find();
  if (!students) return res.status(204).json({ message: "No students found." });
  res.json(students);
};

const createNewStudent = async (req, res) => {
  // if (!req?.body?.username || !req?.body?.password) {
  //   return res
  //     .status(400)
  //     .json({ message: "Username and Password are required" });
  // }

  try {
    const result = await Student.create({
      username: req.body.username,
      lastname: req.body.password,
      email: req.body.email,
      refreshToken: req.body.refreshToken,
      handicap: req.body.handicap,
      yearsPlayed: req.body.yearsPlayed,
      homeCourse: req.body.homeCourse,
      takenLessons: req.body.takenLessons,
      whatToImprove: req.body.whatToImprove,
      startDate: req.body.startDate,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateStudent = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const student = await Student.findOne({ _id: req.body.id }).exec();
  if (!student) {
    return res
      .status(204)
      .json({ message: `No students matches ID ${req.body.id}.` });
  }
  if (req.body?.firstname) student.firstname = req.body.firstname;
  if (req.body?.lastname) student.lastname = req.body.lastname;
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
  if (!req?.params?.id)
    return res.status(400).json({ message: "student ID required." });

  const student = await Student.findOne({ _id: req.params.id }).exec();
  if (!student) {
    return res
      .status(204)
      .json({ message: `No student matches ID ${req.params.id}.` });
  }
  res.json(student);
};

export {
  getAllStudents,
  createNewStudent,
  updateStudent,
  deleteStudent,
  getStudent,
};
