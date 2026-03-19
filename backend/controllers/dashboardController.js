const Product = require("../models/Product");
const Customer = require("../models/Customer");
const SalesOrder = require("../models/SalesOrder");

exports.getDashboard = async (req, res) => {
  try {

    const totalProducts = await Product.countDocuments();
    const totalCustomers = await Customer.countDocuments();
    const totalOrders = await SalesOrder.countDocuments();

    const orders = await SalesOrder.find();

    const totalRevenue = orders.reduce(
      (sum, o) => sum + (o.totalPrice || 0),
      0
    );

    res.json({
      totalProducts,
      totalCustomers,
      totalOrders,
      totalRevenue
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};