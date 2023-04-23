const Scholar = require("../../database/models/scholar.model");
const Courses = require("../../database/models/courses.model");
const Faculty = require("../../database/models/faculty.model");

module.exports = async (req, res, next) => {
  const { course_id } = req.body;
  try{
    // this is for automatically updating the course filed in the faculty 
    //if it does not exist and student has filled it
    const facultyId = await Courses.find({_id : course_id} , ["faculty_id"]);
    // console.log(facultyId);
    const courseId = await Faculty.find({_id : facultyId[0].faculty_id , course : {"$eq" : course_id}});
    // console.log(courseId);
    if(courseId.length == 0 && courseId != null){
      await Faculty.updateOne({_id : facultyId[0].faculty_id},{
        "$push" : {"course" : course_id}
      });
    }
    // console.log(facultyId , courseId);
  }catch(error){
    console.log("error in updating the faculty id ");
    next(error);
  }
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
