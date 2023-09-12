// const Scholar = require('../database/models/scholar.model');
const Course = require('../database/models/courses.model');
const getScholarCourseExamCell = async (req,res,next) =>{

    const data = await Course.find({}).populate('scholars_enrolled').populate('faculty_id');
    res.send(data);
}

module.exports = getScholarCourseExamCell;

