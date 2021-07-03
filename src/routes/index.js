const { Router } = require("express");
const router = Router();

router.use("/", require("./status.route"));
router.use("/", require("./records.route"));
router.use("/", require("./companies.route"));

module.exports = router;
