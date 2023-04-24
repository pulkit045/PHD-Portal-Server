const Scholar = require('../database/models/scholar.model');
const queue = require('../workers/kue');

module.exports = async (req, res, next) => {
	try {
		const { scholar_id,fullName } = req.params;
        console.log(fullName);
		const filter = {_id : scholar_id};
		const update = {supervisor : fullName};

		await Scholar.findOneAndUpdate(filter,update);

		const dt = await Scholar.find(filter);
		// const data = {
		// 	Scholar_name : dt.fullName,
		// 	Scholar_email : dt.email,
		// 	Scholar_supervisor : dt.supervisor
		// };
		// console.log(data);
		// let job = queue.create('emailsfromfaculty',data).save(function(err){
		// 	if(err){
		// 		console.log(`error in creating the job for the worker ${err}`);
		// 		return ;
		// 	}
		// 	// console.log(`job ${job.id} enqueued`);
		// 	return;
		// });

		res.send(`Updated`);
	}
	catch (err) {
		console.error("profile error", err);
		next(err);
	}
};