const Scholar = require('../database/models/scholar.model');
const getScholarSupervisorExamCell = async (req,res,next) =>{

    const dd = await Scholar.find({}, ["_id"])
      .where({ email: { $regex: "mcs" } })
      .exec();
    const scholar = await Scholar.countDocuments({_id : {$nin : dd}});
    // console.log(scholar);
    const data = await Scholar.find({},['fullName','enrollmentNumber','supervisor']).where({_id : {$nin : dd}}, {isDirector : {$eq : true}}).sort('supervisor').exec();
    const isDownloadable = (scholar === data.length);
    return res.send({data,isDownloadable});
}

module.exports = getScholarSupervisorExamCell;

