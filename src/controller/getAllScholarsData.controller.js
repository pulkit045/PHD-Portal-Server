const Scholar = require("../database/models/scholar.model");
const Faculty = require("../database/models/faculty.model");

module.exports = async (req, res, next) => {
  try {
    const dd = await Scholar.find({}, ["_id"])
      .where({ email: { $regex: "mcs" } })
      .exec();
    const scholar_data = await Scholar.find({}, [
      "fullName",
      "enrollmentNumber",
      "requests",
      "supervisor",
      "_id",
      "isDirector",
    ])
      .where({ _id: { $nin: dd } })
      .populate("requests");
    const data = [];
    for (let scholar of scholar_data) {
      let dt = {
        _id: scholar._id,
        firstName: scholar.fullName,
        enrollmentNumber: scholar.enrollmentNumber,
        supervisor: scholar.supervisor,
        requests: [],
        isDirector: scholar.isDirector,
      };
      let flt = [];
      for (let request of scholar.requests) {
        flt.push(request.supervisor_id);
        dt.requests.push(request);
      }
      const flt_nin = await Faculty.find({ _id: { $nin: flt } })
        .where({ email: { $nin: ["fic@iiitl.ac.in", "director@iiitl.ac.in"] } })
        .exec();
      console.log(flt_nin);
      data.push({ dt, flt_nin });
    }
    res.send(data);
  } catch (err) {
    console.error("profile error", err);
    next(err);
  }
};
