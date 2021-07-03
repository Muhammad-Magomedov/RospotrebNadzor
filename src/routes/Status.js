const StatusController = require("../controllers/Status.controller")
const { Router } = require("express")
const router = Router()

router.get("/company/status", StatusController.getStatusByCompany)

module.exports = router