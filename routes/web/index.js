var express = require("express");

var router = express.Router();

//TODO: ADD IN ERROR AND INFO

router.use("/", require("./home"));

module.exports = router;