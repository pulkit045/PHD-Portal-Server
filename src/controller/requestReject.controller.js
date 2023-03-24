const Request = require("../database/models/requests.model")

module.exports = async (req, res, next) => {
	// const body = req.body;
	const reqId = req.params.id;
	// console.log(reqId)

	const request = (await Request.findById(reqId)).toObject();

	if(request.supervisor_status === "Pending"){
		request.supervisor_status = "Rejected";
		await Request.findByIdAndUpdate(reqId, request);
		return res.send({
			"status": "Rejected"
		});
	}

	return res.send({
		"status" : `Request Already being ${request.supervisor_status}`
	})
}