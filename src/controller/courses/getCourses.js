const Scholar = require("../../database/models/scholar.model");
const Courses = require("../../database/models/courses.model");

//working fine : ) 


module.exports = async (req, res, next) => { 
  const { _id } = req.user.user;

  try{
    const {course_active,course_completed} = await Scholar.findById(_id);
    const course = [...course_active,...course_completed];
    console.log(course);

    const data = await Courses.find({_id : {$nin : course}}).populate('faculty_id').exec();
    console.log(data);
    res.send(data);
  }catch(error){
    console.log("Error in finding the courses in which a particular didnot ");
    next(error);
  }
};
