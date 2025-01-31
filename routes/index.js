const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const isLoggedIn = require("../middlewares/isLoggedIn.middleware");
const ProductModel = require("../models/product.model");
const userModel = require("../models/user.model");

router.get("/", (req, res) => {
  const error = [];
  res.render("index", { error: error, loggedin: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  try {
    const products = await ProductModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Product added to cart");
  res.redirect("/shop");
});

router.get("/cart", isLoggedIn, async (req, res) => {
  try {
    let user = await userModel
      .findOne({ email: req.user.email })
      .populate("cart");

    const bill = (Number(user.cart[0].price) + 20) - Number(user.cart[0].discount);
    res.render("cart", { user, bill });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);

module.exports = router;
