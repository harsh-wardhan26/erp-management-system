const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
{
salesOrder: {
type: mongoose.Schema.Types.ObjectId,
ref: "SalesOrder",
required: true
},

amount: {
type: Number,
required: true
},

status: {
type: String,
default: "unpaid"
}
},
{ timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);