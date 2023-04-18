const Scholar = require("../../database/models/scholar.model");
const hashPassword = require("../../utils/hashPassword");

const scholarSignUp = async (req, res, next) => {
	try {

		// mey be can assign role at this point of time : ) 
		const scholar = req.body;
		scholar.password = await hashPassword(scholar.password);

		const newScholar = new Scholar(req.body);
		await newScholar.save();
		res.send(newScholar)
	}
	catch (err) {
		next(err)
	}
}

module.exports = scholarSignUp;