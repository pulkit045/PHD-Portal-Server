const Request = require("../database/models/requests.model");
const Scholar = require("../database/models/scholar.model");
const newRequest = require('../mailers/mailingTemplates/request.js'); 

module.exports = async (req, res, next) => {
	const reqId = req.params.id;
	// console.log(reqId);

	const request = (await Request.findById(reqId)).toObject();
	const user = (await Scholar.findById(request.scholar_id));
	// console.log(request , user);

	
	//check if pending then only update otherwise will not give option to edit
	if(request.supervisor_status === "Pending"){
		request.supervisor_status = "Approved";
		//mail request : ) 
		newRequest.newRequest(request,user);
		await Request.findByIdAndUpdate(reqId, request);
		//now after i have to show the list that this scholar has accepted the request as well as 
		//it is accepted therefore updating it's list maybe ?? 
		
		//now i don't have to update the scholar data i can directly send him this 
		//all his request result to show that who rejected and accepted and pending status as well
		return res.send({
			"status" : "approved"
		});
	}
	return res.send({
		"status" : `Request Already being ${request.supervisor_status}`
	});
}