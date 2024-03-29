const deleteAll = require("../controller/deleteAll");
const getRequestData = require("../controller/getRequestData.controller");

module.exports = {
  // test route
  test: require("./test.router"),
  auth: require("./auth.router"),
  courses: require("./courses.router"),
  profile: require("../controller/profile.controller"),
  facultyProfile: require("../controller/facultyProfile.controller"),
  requestSupervisor: require("../controller/requestSupervisor.controller"),
  getAllFaculty: require("../controller/getAllFaculty.controller"),
  requestApprove: require("../controller/requestApprove.controller"),
  requestReject: require("../controller/requestReject.controller"),
  getAllScholarData: require("../controller/getAllScholarsData.controller"),
  getRequestData: require("../controller/getRequestData.controller"),
  updateSupervisor: require("../controller/updateSupervisor"),
  updateSupervisorNone: require("../controller/updateSupervisorNone"),
  getAllSupervisor: require("../controller/getAllSupervisor"),
  deleteAll: require("../controller/deleteAll"),
  finalizeSupervisor: require("../controller/finalizeSupervisor"),
  finalizeSupervisorRequest: require("../controller/finalizeSupervisorRequest"),
  finalizeSupervisorFaculty: require("../controller/finalizeSupervisorFaculty"),
  getMyScholar : require("../controller/getMyScholar"),
  getScholarSupervisorExamCell : require('../controller/examinationScholar'),
  getScholarCourseExamCell : require('../controller/examinationCourses')
  // downloadFile : require('../controller/downloadExamcell')
};
