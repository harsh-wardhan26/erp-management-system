const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema(
{
supplier: {
type: mongoose.Schema.Types.ObjectId,
ref: "Supplier",
required: true
},

products: [
{
product: {
type: mongoose.Schema.Types.ObjectId,
ref: "Product"
},
quantity: {
type: Number,
required: true
}
}
],

status: {
type: String,
enum: ["pending", "received"],
default: "pending"
}

},
{ timestamps: true }
);

module.exports = mongoose.model("PurchaseOrder", purchaseOrderSchema);