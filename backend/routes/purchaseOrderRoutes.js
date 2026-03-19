const express = require("express");

const router = express.Router();

const {
createPurchaseOrder,
getPurchaseOrders,
receiveGoods
} = require("../controllers/purchaseOrderController");

const { protect } = require("../middleware/authMiddleware");

router.post("/purchase-orders", protect, createPurchaseOrder);

router.get("/purchase-orders", protect, getPurchaseOrders);

router.put("/purchase-orders/:id/receive", protect, receiveGoods);

module.exports = router;