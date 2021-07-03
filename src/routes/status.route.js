const StatusController = require("../controllers/status.controller");
const { Router } = require("express");
const router = Router();

router.get("/status", StatusController.getStatusByCompany);
router.post("/status", StatusController.addNewColorForStatus);

module.exports = router;
