const Scholar = require("../database/models/scholar.model");
const Faculty = require('../database/models/faculty.model');
const queue = require("../workers/kue");

module.exports = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const filter = { _id: _id };
    const update = { isDirector: true };
    await Scholar.findOneAndUpdate(filter, update);
    const data = await Scholar.find(filter);

    await Faculty.updateOne({_id : data[0].temporary_supervisor} , {'$push' : {'under_supervision' : _id}});
    res.send('Finalized The Supervisor');
  } catch (err) {
    console.error("profile error", err);
    next(err);
  }
};
