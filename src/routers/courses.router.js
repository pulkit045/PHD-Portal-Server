const router = require("express").Router();
const courses = require("../controller/courses");

router.patch("/scholar/add-courses", courses.add_courses);
router.patch("/scholar/update-courses", courses.update_courses);

module.exports = router;
