const Request = require("../database/models/requests.model")
const Scholar = require("../database/models/scholar.model");
const newRequest = require('../mailers/mailingTemplates/request');

module.exports = async (req, res, next) => {
	// const body = req.body;
	const reqId = req.params.id;
	// console.log(reqId)

	const request = (await Request.findById(reqId)).toObject();
	const user = (await Scholar.findById(request.scholar_id));

	if(request.supervisor_status === "Pending"){
		request.supervisor_status = "Rejected";

		newRequest.newRequest(request,user);

		await Request.findByIdAndUpdate(reqId, request);
		return res.send({
			"status": "Rejected"
		});
	}

	return res.send({
		"status" : `Request Already being ${request.supervisor_status}`
	})
}