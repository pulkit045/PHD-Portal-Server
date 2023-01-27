import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    faculty_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    courses: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Courses",
      },
    ],
    under_supervising: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Student",
      },
    ],
    pending_request: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Student",
      },
    ]
  },
  {
    timestamps: true,
  }
);

const Faculty = new mongoose.model("Faculty", facultySchema);
export default Faculty;
