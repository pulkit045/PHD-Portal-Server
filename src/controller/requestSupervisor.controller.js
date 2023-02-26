const Scholar = require("../database/models/scholar.model");
const Faculty = require("../database/models/faculty.model");
const Request = require("../database/models/requests.model");

const requestSupervisor = async (req, res, next) => {
  try {
    const body = req.body;
    const scholarData = (await Scholar.findById(req.user.user._id)).toObject();
    const supervisorData = (
      await Faculty.findById(body.supervisor_id)
    ).toObject();

    const requestData = {
      scholar: body.scholar,
      scholar_id: body.scholar_id,
      supervisor: body.supervisor,
      supervisor_id: body.supervisor_id,
      supervisor_status: "Pending",
      // alloted_supervisor_id: ""
    };

    const request = new Request(requestData);

    scholarData.requests.push(request._id);
    supervisorData.requests.push(request._id);

    await request.save();
    await Scholar.findByIdAndUpdate(req.user.user._id, scholarData);
    await Faculty.findByIdAndUpdate(body.supervisor_id, supervisorData);

    res.status = 200;
    res.send({
      value: "Request submitted",
    });
  } catch (err) {
    console.log("err", err);
    next(err);
  }
};

module.exports = requestSupervisor;
