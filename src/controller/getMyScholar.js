const Faculty = require('../database/models/faculty.model');
const getMyScholar = async (req,res,next) =>{
    
    const {_id} = req.user.user;
    console.log(_id);
    const data = await Faculty.findOne({_id : _id},['under_supervision']).populate('under_supervision');
    return res.send(data);
}

module.exports = getMyScholar;

