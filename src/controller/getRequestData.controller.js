const Request = require("../database/models/requests.model");
const Scholar = require("../database/models/scholar.model");


//this one is for getting till now pending or accepted or rejected status of the request : )
const getRequestData = async (req,res,next) =>{
    const scholar_data = await Scholar.find({_id : req.user.user._id},["requests"]).populate("requests");
    const data = [];
    if(scholar_data[0].requests.length > 0){
        scholar_data[0].requests.map((request)=>{
            // console.log(request);
            const dt = {supervisor : request.supervisor , status : request.supervisor_status};
            data.push(dt);
        })
    }
    return res.send(data);
}

module.exports = getRequestData;

