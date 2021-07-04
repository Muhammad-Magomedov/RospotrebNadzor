const company = require("../models/Company.model");

class CompaniesController {
  async getAllCompanies(req, res) {
    try {
      const companies = await company.aggregate([
        {
          $lookup: {
            from: "records",
            as: "records",
            let: { companyId: "$_id" },
            pipeline: [
              {
                $match: { $expr: { $eq: ["$companyId", "$$companyId"] } },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "records",
            as: "lastRecord",
            let: { companyId: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$companyId", "$$companyId"] } } },
              { $sort: {createdAt: -1}},
              {$limit: 1}
            ],
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            image: 1,
            records: 1,
            lastRecord: 1,
          },
        },
        { $unwind: { path: '$lastNote', preserveNullAndEmptyArrays: true} },
      ]);
      res.json(companies);
    } catch (e) {
      res.json(e.message);
    }
  }
  async getCompanyById(req, res) {
    try {
      const companies = await company.findById(req.params.id);
      res.json(companies);
    } catch (e) {
      res.json(e.message);
    }
  }
  async addNewCompany(req, res) {
    try {
      const companies = new company({
        name: req.body.name,
        image: req.body.image,
        updatedAt: Date.now(),
        createdAt: Date.now(),
      });
      await companies.save();
      res.json(companies);
    } catch (e) {
      res.json(e.message);
    }
  }
  async updateCompany(req, res) {
    try {
      const id = req.params.id;
      const { name, image } = req.body;
      const updatedAt = Date.now();
      const companies = await company.findByIdAndUpdate(
        id,
        { name, image, updatedAt },
        { new: true }
      );
      res.json(companies);
    } catch (e) {
      res.json(e.message);
    }
  }
  async removeCompanyById(req, res) {
    try {
      const companies = await company.findByIdAndDelete(req.params.id);
      res.json(companies);
    } catch (e) {
      res.json(e.message);
    }
  }
}

module.exports = new CompaniesController();
