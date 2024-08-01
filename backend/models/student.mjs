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
    type: Boolean,
  },
  whatToImprove: {
    type: String,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
