const Faculty = require("../../database/models/faculty.model");

//completed the same for the faculty such that he or she can see 
// who all have taken his or courses
// moreover which coruses : ) 


module.exports = async (req, res, next) => {
  const { _id } = req.user.user;
  try {
    console.log(_id);
    const {course} = await Faculty.findById(_id).populate({
      path : 'course',
      populate :{
        path : 'scholars_enrolled',
        model : 'scholar'
      }
    });
    const data = course;
    res.send(data);
  }catch(error){
    console.log("error in extracting the data for course field");
    next(error);
  }
};


