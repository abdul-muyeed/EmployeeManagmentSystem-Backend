const express = require("express");
const {signin, signout } = require("../controllers/auth");
const router = express.Router();


router.post("/signin", signin )
router.post("/signout", signout )
module.exports = router;