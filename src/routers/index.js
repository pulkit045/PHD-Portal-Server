module.exports = {
  // test route
  test: require("./test.router"),
  auth: require("./auth.router"),
  profile: require("../controller/profile.controller"),
  facultyProfile: require("../controller/facultyProfile.controller"),
  requestSupervisor: require("../controller/requestSupervisor.controller"),
  getAllFaculty: require("../controller/getAllFaculty.controller"),
  requestApprove: require("../controller/requestApprove.controller"),
  requestReject: require("../controller/requestReject.controller")
};
