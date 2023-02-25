const Request = require("../database/models/requests.model")

module.exports = async (req, res, next) => {
	const body = req.body;
	const reqId = req.params.id;
	console.log(reqId)

	const request = (await Request.findById(reqId)).toObject();
	request.supervisor_status = "Rejected";
	await Request.findByIdAndUpdate(reqId, request);
	return res.send({
		"status": "Rejected"
	})
}