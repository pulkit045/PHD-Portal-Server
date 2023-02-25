const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestsSchema = new Schema({
	scholar: String,
	scholar_id: Schema.Types.ObjectId,
	supervisor: String,
	supervisor_id: Schema.Types.ObjectId,
	supervisor_status: String,
});

// create student model
const requestsModel = mongoose.model("request", RequestsSchema);
module.exports = requestsModel;