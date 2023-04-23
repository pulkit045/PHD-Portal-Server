const Scholar = require("../../database/models/scholar.model");

//completed the getAllCoursesForASchlar
//working fine

module.exports = async (req, res, next) => {
  const { _id } = req.user.user;
  try {
    const { course_active , course_completed } = await Scholar.findById(_id).populate({
        path : 'course_active',
        populate: {
            path : 'faculty_id',
            model : 'facultie'
        }
    }).populate({
        path : 'course_completed',
        populate:{
            path : 'faculty_id',
            model : 'facultie'
        }
    });
    const data = {course_active:course_active , course_completed:course_completed};
    res.send(data);
  }catch(error){
    console.log("error in extracting the data for course field");
    next(error);
  }
};


