const CompanyController = require("../controllers/companies.controller");
const { Router } = require("express");
const router = Router();

router.get("/companies", CompanyController.getAllCompanies);
router.get("/companies/:id", CompanyController.getCompanyById);
router.post("/company", CompanyController.addNewCompany);
router.patch("/company/:id", CompanyController.updateCompany);
router.delete("/company/:id", CompanyController.removeCompanyById);

module.exports = router;
