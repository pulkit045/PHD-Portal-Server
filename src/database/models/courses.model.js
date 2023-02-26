const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
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
    ref: "facultie",
    required: true,
  },
  scholars_enrolled: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "scholar",
    },
  ],
});

// The code in the UserScheme.pre() function is called a pre-hook.
// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it
// StudentSchema.pre("findOneAndUpdate", async function () {
// 	const user = this;

// create student model
const courseModel = mongoose.model("course", CourseSchema);
module.exports = courseModel;
