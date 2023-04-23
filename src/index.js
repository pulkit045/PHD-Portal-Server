const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3001;

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");

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

app.use("/courses",passport.authenticate("jwt",{session: false}), routes.courses);
// verify token
// app.get(
// 	"/verifyToken",
// 	passport.authenticate("jwt", { session: false }),
// 	(req, res) => {
// 		res.status(200).send({ isTokenValid: "valid" });
// 	}
// );

app.get("/profile", passport.authenticate("jwt", { session: false }), routes.profile);
app.get("/faculty/profile", passport.authenticate("jwt", { session: false }), routes.facultyProfile);
app.get("/scholar-data", routes.getAllScholarData);
app.post("/request-supervisor", passport.authenticate("jwt", { session: false }), routes.requestSupervisor);
app.get("/get-all-faculties", passport.authenticate("jwt", { session: false }), routes.getAllFaculty);
app.post("/request/approve/:id", passport.authenticate("jwt", { session: false }), routes.requestApprove);
app.post("/request/reject/:id", passport.authenticate("jwt", { session: false }), routes.requestReject);
app.get("/scholar/request-data", passport.authenticate("jwt",{session:false}), routes.getRequestData);
app.put("/update-supervisor/:_id",passport.authenticate("jwt",{session:false}), routes.updateSupervisor);
app.put("/update-supervisor/:scholar_id/:fullName",passport.authenticate("jwt",{session:false}), routes.updateSupervisorNone);
app.get('/get-all-supervisor',passport.authenticate("jwt",{session:false}), routes.getAllSupervisor );
//for scholar data to show 


// ///////////////////////////    ROUTES END  ////////////////////////////////

// Handle errors.
app.use(function (err, req, res, next) {
	console.error("ERROR:", err.name, ": ", err.message);
	res.status(err.status || 500);
	res.json({ error: err });
});


const { connectToDB } = require("./database");

const startServer = async () => {
	app.listen(port, () => {
		console.log(`Server listinening on http://localhost:${port}`);
	});

	// connect to database
	try {
		await connectToDB();
		console.log("Database Connected.");
	} catch (err) {
		console.log(">ERROR :", err.name);
		console.log(">Error Message :", err.message);
		console.log(">Error Code :", err.code ? err.code : 0);
		console.log(">Error CodeName :", err.codeName ? err.codeName : "null");
	}
};

startServer();
