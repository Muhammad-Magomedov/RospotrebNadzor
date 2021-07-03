const record = require("../models/Record.model");

class RecordsController {
  async getAllRecordsByCompany(req, res) {
    try {
      const records = await record.find({ id: req.params._id });
      res.json(records);
    } catch (e) {
      res.json(e.message);
    }
  }
  async updateRecord(req, res) {
    try {
      const id = req.params._id;
      const { text, status, companyId } = req.body;
      const records = await record.findByIdAndUpdate(
        id,
        { text, status, companyId },
        { new: true }
      );
      res.json(records);
    } catch (e) {
      res.json(e.message);
    }
  }
  async addRecord(req, res) {
    try {
      const { text, status } = req.body;
      const companyId = req.params.id;
      const records = new record({
        text,
        status,
        companyId,
      });
      await records.save();
      res.json(records);
    } catch (e) {
      res.json(e.message);
    }
  }
}

module.exports = new RecordsController();
