const Scholar = require("../../database/models/scholar.model");
const Courses = require("../../database/models/courses.model");

module.exports = async (req, res, next) => {
  const { course_id } = req.body;
  try {
    await Scholar.updateOne(
      { _id: req.user.user._id },
      { "$push": { "course_active": course_id } }
    );
  } catch (error) {
    console.log("add courses error");
    return next(error);
  }

  try {
    await Courses.updateOne(
      { _id: course_id },
      {"$push": {"scholars_enrolled": req.user.user._id}}
    );
  } catch (error) {
    console.log("update courses error");
    return next(error);
  }
  res.send("Courses Added Successfully done");
};
