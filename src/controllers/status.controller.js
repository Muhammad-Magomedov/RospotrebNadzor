const status = require("../models/Status.model");

class StatusController {
  async getStatusByCompany(req, res) {
    try {
      const Status = await status.find({ id: req.params.id });
      res.json(Status);
    } catch (e) {
      res.json(e.message);
    }
  }
  async addNewColorForStatus(req, res) {
    try {
      const {color, text} = req.body
      const Status = new status({
        color: color,
        text: text
      });
      await status.save();
      res.json(status);
    } catch (e) {
      res.json(e.message);
    }
  }
}

module.exports = new StatusController();
