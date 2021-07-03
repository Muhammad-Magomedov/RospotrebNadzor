const { Router } = require("express")
const router = Router()

router.use("/", require("./Status"))
router.use("/", require("./Records"))
router.use("/", require("./Company"))

module.exports = router