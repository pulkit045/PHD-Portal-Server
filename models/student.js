import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

const studentSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  courses: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Course",
    },
  ],
  Super_visor: [
    {
      faculty_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Faculty",
      },
      is_accepted: {
        type: boolean,
      },
    },
  ],
});

const Student = new mongoose.model("Student", studentSchema);

export default Student;
