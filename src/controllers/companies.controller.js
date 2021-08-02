const company = require("../models/Company.model");
const path = require("path");

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
      const {name, image} = req.body
      const companies = new company({
        name,
        image: image,
        updatedAt: Date.now(),
        createdAt: Date.now(),
      });
      await companies.save();
      res.json(companies);
    } catch (e) {
      res.json(e.message);
    }
  }

  async addImage(req, res) {
    const file = req.files.file
    const fileName = file.name
    const url = path.resolve(__dirname, "../public/uploads/img/" + fileName)
    const urlDB = "/uploads/img/" + fileName
    try {
      file.mv(url, async (err) => {
        if(err) {
          console.log(err)
        } else {
          const deb = new company({
            image: urlDB,
            name: req.body.name
          })

          await deb.save()
          res.json(deb)
        }
      })

    } catch (e) {
      res.json(e.message)
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





//   // console.log
//   req.files.file.mv((path.join(__dirname, `../../client/public/uploads/${req.files.file.name}`)), (err) => {
// if (err) {
// console.log("error")
// } else {
// res.json("file uploaded")
// }
// })
// } catch (e) {
//
// }
