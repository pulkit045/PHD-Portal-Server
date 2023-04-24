const Scholar = require("../database/models/scholar.model");
const queue = require("../workers/kue");

module.exports = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const filter = { _id: _id };
    const update = { isDirector: true };
    const dt = await Scholar.findOneAndUpdate(filter, update);
    console.log("hi there");
    res.send(`Finalized The Supervisor`);
  } catch (err) {
    console.error("profile error", err);
    next(err);
  }
};
