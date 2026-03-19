const mongoose = require("mongoose");

const salesOrderSchema = new mongoose.Schema(
{
customer: {
type: mongoose.Schema.Types.ObjectId,
ref: "Customer",
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
enum: ["pending", "completed", "cancelled"],
default: "pending"
},

totalPrice: {
type: Number,
default: 0
}

},
{ timestamps: true }
);

module.exports = mongoose.model("SalesOrder", salesOrderSchema);