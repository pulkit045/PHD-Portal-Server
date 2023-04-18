const Faculty = require("../../database/models/faculty.model");
const hashPassword = require("../../utils/hashPassword");

const facultySignUp = async (req, res, next) => {
	try {
		const faculty = req.body;

		faculty.password = await hashPassword(faculty.password);

		const newfaculty = new Faculty(faculty);
		await newfaculty.save();
		res.send(newfaculty)
	}
	catch (err) {
		console.log(err);
		next(err)
	}
}

module.exports = facultySignUp;