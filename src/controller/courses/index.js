module.exports = {
	add_courses: require("./scholarCourses.controller"),
	update_courses: require("./updatescholarCourses.controller"),
	get_scholar_courses: require('./getAllCourses'),
	get_faculty_courses: require('./getAllCoursesFaculty'),
	get_courses: require('./getCourses')
};
