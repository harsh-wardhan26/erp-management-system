const Product = require("../models/Product");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {

try {

const product = new Product(req.body);

await product.save();

res.status(201).json(product);

} catch (error) {

res.status(500).json({ error: error.message });

}

};

// GET PRODUCTS WITH PAGINATION + SEARCH
exports.getProducts = async (req, res) => {

try {

const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 5;
const search = req.query.search || "";

const query = {
title: { $regex: search, $options: "i" }
};

const products = await Product.find(query)
.skip((page - 1) * limit)
.limit(limit);

const total = await Product.countDocuments(query);

res.json({
total,
page,
pages: Math.ceil(total / limit),
products
});

} catch (error) {

res.status(500).json({ error: error.message });

}

};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {

try {

const product = await Product.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true }
);

res.json(product);

} catch (error) {

res.status(500).json({ error: error.message });

}

};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {

try {

await Product.findByIdAndDelete(req.params.id);

res.json({ message: "Product deleted successfully" });

} catch (error) {

res.status(500).json({ error: error.message });

}

};