const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");

// import required created files
const routes = require("./routers");

const app = express();
app.use(
	cors({
		// use JSON.parse to convert the string received from process.env to required JavaScript format (array)
		origin: JSON.parse(process.env.ALLOWED_ORIGINS),
		optionsSuccessStatus: 200,
	})
);
// log all requests in console
app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// if database is not connected, throw error
app.use(function (req, res, next) {
	// mongoose.connection.readyState is
	// 0 = disconnected
	// 1 = connected
	// 2 = connecting
	// 3 = disconnecting
	if (mongoose.connection.readyState === 1) {
		next();
	} else {
		res.status(500);
		res.json({ error: "Internal Server Error - Database Disconnected" });
	}
});

// //////////////////////////////    ROUTES   ////////////////////////////////
// test route
app.use("/test", routes.test);

// authentication of the user
app.use("/auth", routes.auth);

// verify token
// app.get(
// 	"/verifyToken",
// 	passport.authenticate("jwt", { session: false }),
// 	(req, res) => {
// 		res.status(200).send({ isTokenValid: "valid" });
// 	}
// );

// ///////////////////////////    ROUTES END  ////////////////////////////////

// Handle errors.
app.use(function (err, req, res, next) {
	console.error(">ERROR", err.name, ": ", err.message);
	res.status(err.status || 500);
	res.json({ error: err });
});

module.exports = app;
