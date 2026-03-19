const express = require("express");

const router = express.Router();

const {
createProduct,
getProducts,
updateProduct,
deleteProduct
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");

router.post("/products", protect, createProduct);

router.get("/products", protect, getProducts);

router.put("/products/:id", protect, updateProduct);

router.delete("/products/:id", protect, deleteProduct);

module.exports = router;