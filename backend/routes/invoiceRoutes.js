const express = require("express");
const router = express.Router();

const {
  createInvoice,
  getInvoices,
  getInvoiceById
} = require("../controllers/invoiceController");

router.post("/invoices", createInvoice);
router.get("/invoices", getInvoices);
router.get("/invoices/:id", getInvoiceById);

module.exports = router;