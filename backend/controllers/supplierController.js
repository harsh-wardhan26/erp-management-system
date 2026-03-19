const Supplier = require("../models/Supplier");

// CREATE SUPPLIER
exports.createSupplier = async (req, res) => {

try {

const supplier = new Supplier(req.body);

await supplier.save();

res.status(201).json(supplier);

} catch (error) {

res.status(500).json({ error: error.message });

}

};

// GET ALL SUPPLIERS
exports.getSuppliers = async (req, res) => {

try {

const suppliers = await Supplier.find();

res.json(suppliers);

} catch (error) {

res.status(500).json({ error: error.message });

}

};