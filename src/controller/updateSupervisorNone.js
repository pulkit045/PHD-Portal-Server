const Scholar = require('../database/models/scholar.model');
const Faculty = require('../database/models/faculty.model');
const queue = require('../workers/kue');

module.exports = async (req, res, next) => {
	try {
		const { scholar_id ,fullName, supervisor_id } = req.params;
        console.log(fullName);
		const filter = {_id : scholar_id};
		const update = {supervisor : fullName};
		const upd = {temporary_supervisor : supervisor_id};
		await Scholar.findOneAndUpdate(filter,update);
		await Scholar.findOneAndUpdate(filter , upd);
		// await Faculty.findOneAndUpdate({_id : supervisor_id} , {temporary_by_fic : scholar_id});
		// const dt = await Scholar.find(filter);
		res.send(`Updated`);
	}
	catch (err) {
		console.error("profile error", err);
		next(err);
	}
};