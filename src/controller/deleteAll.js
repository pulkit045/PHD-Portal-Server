const Scholar = require('../database/models/scholar.model');
const Request = require('../database/models/requests.model');
const Faculty = require('../database/models/faculty.model');
const Courses = require('../database/models/courses.model');

module.exports = async (req, res, next) => {
	try {
        await Courses.deleteMany();
        await Faculty.deleteMany();
		await Scholar.deleteMany();
        await Request.deleteMany();

		res.send('deletec succesfully');
	}
	catch (err) {
		console.error("profile error", err);
		next(err);
	}
};