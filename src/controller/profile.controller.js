const Scholar = require("../database/models/scholar.model");

module.exports = async (req, res, next) => {
  try {
    // console.log(req);
    const scholar = (
      await Scholar.findById(req.user.user._id).populate("requests").populate("course_active").populate("course_completed")
    ).toObject();
    // console.log("scholar", scholar);
    delete scholar["password"];
    delete scholar["notification"];
    delete scholar["readNotifications"];
    // const scholar = {
    // 	fullName: data.fullName,
    // 	enrollmentNumber: data.enrollmentNumber,
    // 	admission: data.admission,
    // 	gender: data.gender,
    // 	contact: data.contactNo,
    // 	email: data.email,
    // 	program: data.program,
    // 	requestedFaculty: data.requested_faculty,
    // 	approvedFaculty: data.approved_faculty
    // }
    res.send(scholar);
  } catch (err) {
    console.error("profile error", err);
    next(err);
  }
};
