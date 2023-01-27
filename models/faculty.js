import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
    user : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User'
    },
    courses : [{
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Courses' 
    }],
    supervising : [{
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Student'
    }]

},{
    timestamps : true
});

const Faculty = new mongoose.model('Faculty' , facultySchema);
export default Faculty;