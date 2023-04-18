const Request = require("../database/models/requests.model")
const Scholar = require("../database/models/scholar.model");
const newRequest = require('../mailers/mailingTemplates/request');
const queue = require('../workers/kue');
const requestWorker = require('../workers/request_worker');

module.exports = async (req, res, next) => {
	// const body = req.body;
	const reqId = req.params.id;
	// console.log(reqId)

	const request = (await Request.findById(reqId)).toObject();
	const user = (await Scholar.findById(request.scholar_id));
	const data = {
		request : request,
		user : user
	};

	

	if(request.supervisor_status === "Pending"){
		request.supervisor_status = "Rejected";

		// newRequest.newRequest(request,user);

		let job = queue.create('emails',data).save(function(err){
			if(err){
				console.log(`err in creating the job for the wroker ${err}`);
				return;
			}
	
			// console.log(`job ${job.id} is enqueud`);
			return;
		});


		await Request.findByIdAndUpdate(reqId, request);
		return res.send({
			"status": "Rejected"
		});
	}

	return res.send({
		"status" : `Request Already being ${request.supervisor_status}`
	})
}