const Records = require("../models/Records");

class RecordsController {
  async getAllRecordsByCompany(req, res) {
    try {
      const records = await Records.find({ id: req.params.status });
      res.json(records);
    } catch (e) {
      res.json(e.message);
    }
  }
  async updateRecord(req, res) {
    try {
        const id = req.params.id
      const { text, companyId } = req.body;
      const records = await Records.findByIdAndUpdate(
        id,
        { text, companyId },
        { new: true }
      );
      res.json(records)
    } catch (e) {
      res.json(e.message);
    }
  }
  async addRecord(req,res) {
      try {
          const { text, companyId } = req.body
          const records = new Records({
              text,
              companyId,
              quantity: Records.length
          })
          await records.save()
          res.json(records)
      } catch (e) {
          res.json(e.message)
      }
  }
}

module.exports = new RecordsController