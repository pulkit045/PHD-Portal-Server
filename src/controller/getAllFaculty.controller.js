const Faculty = require("../database/models/faculty.model");

module.exports = async (req, res, next) => {
	try {
		const faculties = await Faculty.find({}, ["fullName", "_id"]);
		// console.log(faculties);
		res.send(faculties);
	} catch (err) {
		console.error("Error in get all faculty", err);
		next(err);
	}
}