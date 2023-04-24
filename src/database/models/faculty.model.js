const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const FacultySchema = new Schema({
	fullName: {
		type: String,
		required: true,
	},

	gender: {
		type: String,
		required: true,
	},

	contactNo: {
		type: String,
		required: true,
	},

	// email to contact(generally personal Email)
	email: {
		type: String,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},

	// field of research
	program: {
		type: String,
		required: true,
	},

	course:[
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: "course"
		}
	],

	requests: [
		{
			type: Schema.Types.ObjectId,
			ref: "request"
		}
	],
	under_supervision : [
		{
			type : Schema.Types.ObjectId,
			ref : 'scholar'
		}
	],
	notification: [
		{
			iat: {
				type: Date,
				required: true,
				default: Date.now,
			},
			exp: {
				type: Date,
				required: true,
				default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
			},
			message: {
				type: String,
			},
		},
	],

	readNotifications: [
		{
			iat: {
				type: Date,
				required: true,
				default: Date.now,
			},
			message: {
				type: String,
			},
		},
	],

});

// The code in the UserScheme.pre() function is called a pre-hook.
// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it
// StudentSchema.pre("findOneAndUpdate", async function () {
// 	const user = this;
// 	//   console.log("pre hook", user);
// 	const hash = await bcrypt.hash(user._update.password, 10);
// 	//   console.log(hash);
// 	user._update.password = hash;
// 	//   console.log("pre hook done", user);
// });

// bcrypt hashes the password sent by the user for login
// and checks if the hashed password stored in the database matches the one sent.
// It will return true if there is a match.
// Otherwise, it will return false if there is not a match.
FacultySchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);

	return compare;
};

// create student model
const facultyModel = mongoose.model("facultie", FacultySchema);
module.exports = facultyModel;
