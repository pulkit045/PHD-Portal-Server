const Scholar = require('../database/models/scholar.model');
const getScholarSupervisorExamCell = async (req,res,next) =>{

    const dd = await Scholar.find({}, ["_id"])
      .where({ email: { $regex: "mcs" } })
      .exec();
    
    const data = await Scholar.find({},['fullName','enrollmentNumber','supervisor']).where({_id : {$nin : dd}}, {isDirector : {$eq : true}}).sort('supervisor').exec();
    return res.send(data);
}

module.exports = getScholarSupervisorExamCell;

