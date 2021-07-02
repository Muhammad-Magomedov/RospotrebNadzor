const Companies = require("../models/Companies")

class CompaniesController {
    async getAllCompanies(req, res) {
        try {
            const companies = await Companies.find({})
            res.json(companies)
        } catch (e) {
            res.json(e.message)
        }
    }
    async getCompanyById(req, res) {
        try {
            const companies = await Companies.findById(req.params.id)
            res.json(companies)
        } catch (e) {
            res.json(e.message)
        }
    }
    async addNewCompany(req, res) {
        try {
            const companies = new Companies({
                name: req.body.name,
                image: req.body.image,
                updatedAt: Date.now(),
                createdAt: Date.now(),
                status: req.body.status,
                recordQuantity: req.body.recordQuantity
            })
            await companies.save()
            res.json(companies)
        } catch (e) {
            res.json(e.message)
        }
    }
    async updateCompany(req, res) {
        try {
            const id = req.params.id
            const {name, image, status, recordQuantity} = req.body
            const updatedAt = Date.now()
            const companies = await Companies.findByIdAndUpdate(id, {name, image, status, recordQuantity, updatedAt}, {new:true})
            res.json(companies)
        } catch (e) {
            res.json(e.message)
        }
    }
    async removeCompanyById(req, res) {
        try {
            const companies = await Companies.findByIdAndDelete(req.params.id)
            res.json(companies)
        } catch (e) {
            res.json(e.message)
        }
    }
}

module.exports = new CompaniesController