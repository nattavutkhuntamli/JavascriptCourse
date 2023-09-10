const path = require("path");
const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const adminController = require('../controllers/admin')


router.get("/add-product",adminController.getaddProduct);

router.get("/products",adminController.getProducts);


router.post("/add-product",adminController.postAddProduct);

module.exports = router
