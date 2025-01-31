const express = require("express");
const router = express.Router();
const generateToken = require("../utils/generateToken");
const authController = require("../controllers/auth.controller");
const isLoggedIn = require("../middlewares/isLoggedIn.middleware");
const ProductModel = require("../models/product.model");

router.get("/", (req, res) => {
    res.send("User");
});

router.get("/shop", isLoggedIn, async (req, res) => {
    try {
        const products = await ProductModel.find();
        const success = req.flash("success") || '';
        res.render("shop", { products: products, success });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser)

module.exports = router;