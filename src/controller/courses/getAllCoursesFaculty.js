const Faculty = require("../../database/models/faculty.model");
const Course = require("../../database/models/courses.model");

//completed the same for the faculty such that he or she can see 
// who all have taken his or courses
// moreover which coruses : ) 


module.exports = async (req, res, next) => {
  const { _id } = req.user.user;
  try {
    console.log(_id);
    const data = await Course.find({faculty_id : _id}).populate({path : 'scholars_enrolled' , model : 'scholar'});
    res.send(data);
  }catch(error){
    console.log("error in extracting the data for course field");
    next(error);
  }
};


