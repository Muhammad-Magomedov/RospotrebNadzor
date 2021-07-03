const RecordsController = require("../controllers/records.controller");
const { Router } = require("express");
const router = Router();

router.get("/records/company/:id", RecordsController.getAllRecordsByCompany);
router.patch("/record/company/:id", RecordsController.updateRecord);
router.post("/record/company/:id", RecordsController.addRecord);

module.exports = router;
