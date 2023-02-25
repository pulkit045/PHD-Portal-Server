const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const ScholarSchema = new Schema({
	fullName: {
		type: String,
		required: true,
	},

	enrollmentNumber: {
		type: String,
		required: true,
	},

	// year of admission in Ph.D
	admission: {
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

	requests: [
		{
			type: Schema.Types.ObjectId,
			ref: "request"
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

	supervisor: {
		type: String,
		default: "NA"
	},

	courses: [
		{ type: String }
	],

	total_credits_active: {
		type: Number,
		default: 0
	},
	total_credits_done: {
		type: Number,
		default: 0
	}


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
ScholarSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);

	return compare;
};

// create student model
const scholarModel = mongoose.model("scholar", ScholarSchema);
module.exports = scholarModel;
