const router = require("express").Router();
const courses = require("../controller/courses");

router.patch("/scholar/add-courses", courses.add_courses);
router.patch("/scholar/update-courses", courses.update_courses);
router.get("/scholar/get-all-courses", courses.get_scholar_courses);
router.get("/faculty/get-all-courses",courses.get_faculty_courses);
router.get('/scholar/get-courses' , courses.get_courses);


module.exports = router;
