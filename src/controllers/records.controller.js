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
      const id = req.params.id;
      const { text, status } = req.body;
      const updatedAt = Date.now()
      const records = await record.findByIdAndUpdate(
        id,
        { text, status, updatedAt },
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
      const updatedAt = Date.now()
      const companyId = req.params.id;
      const records = new record({
        text,
        status,
        updatedAt,
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
