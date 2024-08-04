import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 20,
  },

  password: {
    type: String,
    // required: true,
  },

  refreshToken: String,
  startDate: {
    type: Date,
    // default: () => new Date().toISOString().split("T")[0],
    default: Date.now,
  },
  handicap: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
  },
  yearsPlayed: {
    type: Number,
  },
  homeCourse: {
    type: String,
  },
  takenLessons: {
    type: String,
    enum: ["yes", "no"],
    default: "no",
  },
  whatToImprove: {
    type: String,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  profileImage: {
    type: String,
    default: "https://via.placeholder.com/100",
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
