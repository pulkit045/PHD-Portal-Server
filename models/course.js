import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    cid: {
      type: String,
      required: true,
    },
    course_name: {
      type: String,
      required: true,
    },
    course_credits: {
      type: Number,
      requred: true,
    },
    faculty_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Faculty",
      required: true,
    },
    students_enrolled: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = new mongoose.model("Course", courseSchema);

export default Course;
