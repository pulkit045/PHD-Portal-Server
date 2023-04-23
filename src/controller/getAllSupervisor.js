const Faculty = require("../database/models/faculty.model");
const Scholar = require("../database/models/scholar.model");

module.exports = async (req, res, next) => {
	try {
		const supervisor_notassigned = await Scholar.find({},["fullName","enrollmentNumber"]).where({'supervisor' :{$eq : ""}}).exec();
		const supervisor_assigned = await Scholar.find({},["fullName","enrollmentNumber","supervisor"]).where({'supervisor' : {$ne: ""}}).sort('supervisor').exec();
		res.send({supervisor_notassigned , supervisor_assigned});
	} catch (err) {
		console.error("Error in fetching the data Supervisor", err);
		next(err);
	}
}