const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../../utils/passport");

module.exports = async (req, res, next) => {
	passport.authenticate("scholar_signin", async (err, user, info) => {
		try {
			if (err) {
				// console.log(err);
				throw new Error(err);
			}
			if (!user) {
				// console.log("User couldn't be found for authentication.");
				throw new Error(info.message);
			}

			req.login(user, { session: false }, async (error) => {
				if (error) {
					console.log("User couldn't be logged in.");
					throw new Error(error);
				}

				const body = { _id: user._id, email: user.email, fullName: user.fullName };

				let role = "scholar";

				const token = jwt.sign({ user: body, role }, process.env.SECRET, {
					expiresIn: "24h",
				});

				return res.json({ token });
			});
		} catch (error) {
			error.status = 401;
			return next(error);
		}
	})(req, res, next);
};
