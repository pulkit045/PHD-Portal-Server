const Scholar = require("../database/models/scholar.model");
const Faculty = require("../database/models/faculty.model");
const queue = require("../workers/kue");

module.exports = async (req, res, next) => {
  try {
    const { scholar_id, supervisor_id, fullName } = req.params;

    const filter = {
      _id: scholar_id,
    };
    const update = { isDirector: true, supervisor: fullName };
    await Scholar.findOneAndUpdate(filter, update);
    await Faculty.updateOne({_id : supervisor_id},{'$push' : {'under_supervision' : scholar_id}});
    res.send(`Finalized The Supervisor`);
  } catch (err) {
    console.error("profile error", err);
    next(err);
  }
};
