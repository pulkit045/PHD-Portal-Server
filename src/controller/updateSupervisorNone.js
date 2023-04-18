const Scholar = require('../database/models/scholar.model');

module.exports = async (req, res, next) => {
	try {
		const { scholar_id,fullName } = req.params;
        console.log(fullName);
		const filter = {_id : scholar_id};
		const update = {supervisor : fullName};

		await Scholar.findOneAndUpdate(filter,update);

		res.send(`Updated`);
	}
	catch (err) {
		console.error("profile error", err);
		next(err);
	}
};