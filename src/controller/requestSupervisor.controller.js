const Scholar = require("../database/models/scholar.model");
const Faculty = require("../database/models/faculty.model");
const Request = require("../database/models/requests.model");

const requestSupervisor = async (req, res, next) => {
  try {

    // check for duplicacy in request then only adding : )
    const body = req.body;
    // console.log(req.user.user._id);
    const isRequested = await Request.find({scholar_id : req.user.user._id , supervisor_id : req.body.supervisor_id});
    // console.log(isRequested);
    if(isRequested.length){
      res.status = 200;
      res.send({
        value: "Same Request is Already made",
      });
      return;
    }
    const scholarData = (await Scholar.findById(req.user.user._id)).toObject();
    const supervisorData = (
      await Faculty.findById(body.supervisor_id)
    ).toObject();
    // console.log(body);
    const requestData = {
      scholar: scholarData.fullName,
      scholar_id: req.user.user._id,
      supervisor: supervisorData.fullName,
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
