const Scholar = require("../../database/models/scholar.model");
const Courses = require("../../database/models/courses.model");

module.exports = async (req, res, next) => {
  console.log('Being Hit');
  const { course_id } = req.body;
  try{
    await Scholar.updateOne(
      { _id: req.user.user._id },
      {"$pull":{"course_active":course_id}}
    );
  }catch(error){
    console.log("course_active not deleted" , error);
    next(error);
  }

  try{
    await Scholar.updateOne(
      { _id: req.user.user._id },
      {"$push":{"course_completed":course_id}}
    );
  }catch(error){
    console.log("course completion not added");
    next(error);
  }
  
  try{
    await Courses.updateOne(
      { _id: course_id },
      {"$pull":{"scholars_enrolled": req.user.user._id}}
    );
  }catch(error){
    console.log("Course scholars enrolled not changed");
    next(error);
  }
  res.send("Courses changed from active to complete");
};
