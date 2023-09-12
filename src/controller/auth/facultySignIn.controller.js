const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../../utils/passport");

const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res, next) => {
	passport.authenticate("faculty_signin", async (err, user, info) => {
		try {
			if (err) {
				throw new Error(err);
			}
			if (!user) {
				throw new Error(info.message);
			}

			req.login(user, { session: false }, async (error) => {
				if (error) {
					console.log("User couldn't be logged in.");
					throw new Error(error);
				}

				const body = { _id: user._id, email: user.email, fullname: user.fullname };
				console.log(body);
				let role = "faculty";

				if (user.email === "director@iiitl.ac.in") {
					role = "director";
				}
				else if (user.email === "fic@iiitl.ac.in") {
					role = "fic";
				}
				else if(user.email === "examinationcell@iiitl.ac.in"){
					role = "ecell";
				}

				const token = jwt.sign({ user: body, role }, process.env.SECRET, {
					expiresIn: "30d",
				});

				return res.json({ token });
			});
		} catch (error) {
			error.status = 401;
			return next(error);
		}
	})(req, res, next);
};
