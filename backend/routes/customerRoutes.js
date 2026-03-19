const express = require("express");

const router = express.Router();

const {
createCustomer,
getCustomers,
updateCustomer,
deleteCustomer
} = require("../controllers/customerController");

const { protect } = require("../middleware/authMiddleware");

router.post("/customers", protect, createCustomer);

router.get("/customers", protect, getCustomers);

router.put("/customers/:id", protect, updateCustomer);

router.delete("/customers/:id", protect, deleteCustomer);

module.exports = router;