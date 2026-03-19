const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const salesOrderRoutes = require("./routes/salesOrderRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const grnRoutes = require("./routes/grnRoutes");

app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", customerRoutes);
app.use("/api", salesOrderRoutes);
app.use("/api", supplierRoutes);
app.use("/api", purchaseOrderRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", grnRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
res.send("ERP API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});