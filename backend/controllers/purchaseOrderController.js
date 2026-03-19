const PurchaseOrder = require("../models/PurchaseOrder");
const Product = require("../models/Product");

// CREATE PURCHASE ORDER
exports.createPurchaseOrder = async (req, res) => {

try {

const order = new PurchaseOrder(req.body);

await order.save();

res.status(201).json(order);

} catch (error) {

res.status(500).json({ error: error.message });

}

};

// GET ALL PURCHASE ORDERS
exports.getPurchaseOrders = async (req, res) => {

try {

const orders = await PurchaseOrder.find()
.populate("supplier")
.populate("products.product");

res.json(orders);

} catch (error) {

res.status(500).json({ error: error.message });

}

};

// RECEIVE GOODS (UPDATE STOCK)
exports.receiveGoods = async (req, res) => {

try {

const order = await PurchaseOrder.findById(req.params.id);

for (let item of order.products) {

const product = await Product.findById(item.product);

product.stock += item.quantity;

await product.save();

}

order.status = "received";

await order.save();

res.json({ message: "Stock updated successfully", order });

} catch (error) {

res.status(500).json({ error: error.message });

}

};