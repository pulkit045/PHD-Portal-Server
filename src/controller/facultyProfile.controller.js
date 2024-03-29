const Faculty = require("../database/models/faculty.model");

module.exports = async (req, res, next) => {
	try {
		// console.log(req.user.role);
		const faculty = (await Faculty.findById(req.user.user._id).populate("requests").populate("course")).toObject();
		// console.log("scholar", scholar);
		delete faculty["password"]
		delete faculty["notification"]
		delete faculty["readNotifications"]
		// const scholar = {
		// 	fullName: data.fullName,
		// 	enrollmentNumber: data.enrollmentNumber,
		// 	admission: data.admission,
		// 	gender: data.gender,
		// 	contact: data.contactNo,
		// 	email: data.email,
		// 	program: data.program,
		// 	requestedFaculty: data.requested_faculty,
		// 	approvedFaculty: data.approved_faculty
		// }
		// console.log(faculty);
		res.send(faculty);
	}
	catch (err) {
		console.error("profile error", err);
		next(err);
	}
};