const Request = require("../database/models/requests.model");
const Scholar = require("../database/models/scholar.model");
const Faculty = require('../database/models/faculty.model');
const queue = require("../workers/kue");

module.exports = async (req, res, next) => {
  try {
    const dat = req.params;
    const wanttoupdateData = await Request.findById(dat);
    const { scholar_id, supervisor , supervisor_id } = wanttoupdateData;
    const _id = scholar_id;
    const filter = { _id: _id };
    const update = { supervisor: supervisor };
    const upd = {temporary_supervisor : supervisor_id};
    await Scholar.findOneAndUpdate(filter, update);
    await Scholar.findOneAndUpdate(filter,upd);
    const dt = await Scholar.find(filter);

    //Faculty is not updated : )

    res.send(`Updated`);
  } catch (err) {
    console.error("profile error", err);
    next(err);
  }
};
