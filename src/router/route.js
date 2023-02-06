const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategory,
  getcategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
router.post("/category", createCategory);
router.get("/category", getAllCategory);
router.get("/categoryById", getcategoryById);
router.put("/category", updateCategory);
router.delete("/category", deleteCategory);

const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post("/product", createProduct);
router.get("/product", getAllProducts);
router.get("/productById", getProduct);
router.put("/product", updateProduct);
router.delete("/product", deleteProduct);

module.exports = router;
