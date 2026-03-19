const GRN = require("../models/grnModel");
const Product = require("../models/Product");

exports.createGRN = async (req, res) => {
  try {

    const { purchaseOrder, receivedProducts } = req.body;

    const grn = await GRN.create({
      purchaseOrder,
      receivedProducts
    });

    // update inventory stock
    for (const item of receivedProducts) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: item.quantity } }
      );
    }

    res.status(201).json({
      message: "GRN created successfully",
      grn
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};