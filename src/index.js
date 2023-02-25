const dotenv = require("dotenv");
// const app = require("./server");

dotenv.config();

const port = process.env.PORT || 3001;

// ----------------------------------------------    APP.JS    -------------------------------///////////////////


// import required node_modules
// ! DO NOT CHANGE ANYTHING HERE.
// ! CHANGING ANYTHING HERE MIGHT BREAK THE APP
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
// ------------------------------------------------------------------------
//
// import required created files
const routes = require("./routers");

// initialize express app
const app = express();

// /////////////////////    CORS    /////////////////////////////////////////
// ! DO NOT CHANGE ANYTHING HERE
//
// to allow all cross-origin requests, use
// app.use(cors());
//
// to allow cors for selected origins, use
app.use(
	cors({
		// use JSON.parse to convert the string received from process.env to required JavaScript format (array)
		origin: JSON.parse(process.env.ALLOWED_ORIGINS),
		optionsSuccessStatus: 200,
	})
);

// /////////////////////    CORS END /////////////////////////////////////////

// log all requests in console
app.use(morgan("dev"));

// ///////////////    Compulsory Middlewares    //////////////////////////////
// ! DO NOT CHANGE ANYTHING HERE
// to parse json body data from requests (i.e req.body)
app.use(express.json());

// to parse data from x-urlencoded-forms
app.use(express.urlencoded({ extended: true }));

// ///////////////    Compulsory Middlewares END /////////////////////////////

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

app.get("/profile", passport.authenticate("jwt", { session: false }), routes.profile)
app.get("/faculty/profile", passport.authenticate("jwt", { session: false }), routes.facultyProfile)
app.post("/request-supervisor", passport.authenticate("jwt", { session: false }), routes.requestSupervisor);
app.get("/get-all-faculties", passport.authenticate("jwt", { session: false }), routes.getAllFaculty);
app.post("/request/:id/approve", passport.authenticate("jwt", { session: false }), routes.requestApprove)
app.post("/request/:id/reject", passport.authenticate("jwt", { session: false }), routes.requestReject)


// ///////////////////////////    ROUTES END  ////////////////////////////////

// Handle errors.
app.use(function (err, req, res, next) {
	// console.log(req)
	console.error(">ERROR", err.name, ": ", err.message);
	res.status(err.status || 500);
	res.json({ error: err });
});

// module.exports = app;

// ----------------------------------------------------    APP.JS END ------------------------------------//////////////////





// establish connection to DB
const { connectToDB } = require("./database");

const startServer = async () => {
	// start listening on specified port
	app.listen(port, () => {
		console.log(`Server listinening on http://localhost:${port}`);
	});

	// connect to database
	try {
		await connectToDB();
		console.log("Database Connected.");
	} catch (err) {
		// console.log(err);
		console.log(">ERROR :", err.name);
		console.log(">Error Message :", err.message);
		console.log(">Error Code :", err.code ? err.code : 0);
		console.log(">Error CodeName :", err.codeName ? err.codeName : "null");
	}
};

startServer();
