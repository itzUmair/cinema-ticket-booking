const express = require("express");
const { home } = require("../controllers");

const router = express.Router();

router.route("/").get(home);

module.exports = router;
