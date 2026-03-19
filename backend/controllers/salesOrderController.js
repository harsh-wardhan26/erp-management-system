const SalesOrder = require("../models/SalesOrder");
const Product = require("../models/Product");

// CREATE SALES ORDER
exports.createSalesOrder = async (req, res) => {
try {

const { customer, products } = req.body;

let totalPrice = 0;

for (let item of products) {

const product = await Product.findById(item.product);

if (!product) {
return res.status(404).json({ message: "Product not found" });
}

totalPrice += product.price * item.quantity;

}

const order = new SalesOrder({
customer,
products,
totalPrice
});

await order.save();

res.status(201).json(order);

} catch (error) {

res.status(500).json({ error: error.message });

}
};

// GET ALL SALES ORDERS
exports.getSalesOrders = async (req, res) => {

try {

const orders = await SalesOrder.find()
.populate("customer")
.populate("products.product");

res.json(orders);

} catch (error) {

res.status(500).json({ error: error.message });

}

};