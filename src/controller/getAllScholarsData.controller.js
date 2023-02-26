const Scholar = require("../database/models/scholar.model");

// const Faculty = require("../database/models/faculty.model");

module.exports = async (req, res, next) => {
  try {
    const scholar_data = await Scholar.find({},["fullName","enrollmentNumber","requests"]).populate("requests");
    const data = [];
    for(let scholar of scholar_data){
        console.log(scholar);
        let dt = {firstName:scholar.fullName, enrollmentNumber:scholar.enrollmentNumber , requests : []};        
        for(let request of scholar.requests){
            if(request.supervisor_status === "Approved")
                dt.requests.push(request);
        }
        data.push(dt);
    }
    res.send(data);
  } catch (err) {
    console.error("profile error", err);
    next(err);
  }
};
