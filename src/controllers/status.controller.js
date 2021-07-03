const status = require("../models/Status.model");

class StatusController {
  async getStatusByCompany(req, res) {
    try {
      const status = await status.find({ id: req.params.id });
      res.json(status);
    } catch (e) {
      res.json(e.message);
    }
  }
  async addNewColorForStatus(req, res) {
    try {
      const status = new status({
        color: req.body.color,
        text: req.body.text,
      });
      await status.save();
      res.json(status);
    } catch (e) {
      res.json(e.message);
    }
  }
}

module.exports = new StatusController();
