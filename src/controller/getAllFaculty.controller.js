const Faculty = require("../database/models/faculty.model");
const Request = require("../database/models/requests.model");
module.exports = async (req, res, next) => {
  try {
    const faculties = await Faculty.find({}, ["fullName", "_id"])
      .where({ email: { $nin: ["fic@iiitl.ac.in", "director@iiitl.ac.in"] } })
      .exec();
    const data = [];
    for (let faculty of faculties) {
      // console.log(faculty);
      const isRequested = await Request.find({
        scholar_id: req.user.user._id,
        supervisor_id: faculty._id,
      });
      // console.log(isRequested);
      if (isRequested != null && isRequested.length == 0) {
        // console.log("Empty goes here");
        // console.log(faculty);
        data.push(faculty);
      }
    }
    // console.log(faculties);
    res.send(data);
  } catch (err) {
    console.error("Error in get all faculty", err);
    next(err);
  }
};
