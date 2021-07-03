const Status = require("../models/Status")

class StatusController {
    async getStatusByCompany(req,res) {
        try {
            const status = await Status.find({id: req.params.id})
            res.json(status)
        } catch (e) {
            res.json(e.message)
        }
    }
}

module.exports = new StatusController