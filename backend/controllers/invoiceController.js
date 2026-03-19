const Invoice = require("../models/Invoice");


// CREATE INVOICE
exports.createInvoice = async (req, res) => {
  try {

    const invoice = await Invoice.create(req.body);

    res.status(201).json({
      message: "Invoice created successfully",
      invoice
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL INVOICES
exports.getInvoices = async (req, res) => {
  try {

    const invoices = await Invoice.find()
      .populate("salesOrder");

    res.json(invoices);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET INVOICE BY ID
exports.getInvoiceById = async (req, res) => {
  try {

    const invoice = await Invoice.findById(req.params.id)
      .populate("salesOrder");

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found"
      });
    }

    res.json(invoice);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};