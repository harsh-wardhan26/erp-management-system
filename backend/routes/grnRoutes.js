const express = require("express");
const router = express.Router();

const { createGRN } = require("../controllers/grnController");

router.post("/grn", createGRN);

module.exports = router;