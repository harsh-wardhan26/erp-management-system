const express = require("express");

const router = express.Router();

const {
createSalesOrder,
getSalesOrders
} = require("../controllers/salesOrderController");

const { protect } = require("../middleware/authMiddleware");

router.post("/sales-orders", protect, createSalesOrder);

router.get("/sales-orders", protect, getSalesOrders);

module.exports = router;