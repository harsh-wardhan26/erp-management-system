const express = require("express");

const router = express.Router();

const {
createSupplier,
getSuppliers
} = require("../controllers/supplierController");

const { protect } = require("../middleware/authMiddleware");

router.post("/suppliers", protect, createSupplier);

router.get("/suppliers", protect, getSuppliers);

module.exports = router;