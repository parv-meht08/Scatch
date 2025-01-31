const express = require("express");
const router = express.Router();
const ProductModel = require("../models/product.model");
const upload = require("../config/multer");

router.get("/", (req, res) => {
  res.send("Product");
});

router.post("/create", upload.single("image"), async (req, res) => {
   try {
     let{ name, price, bgcolor, panelcolor, textcolor } = req.body
 
   let product = await ProductModel.create({
     image: req.file.buffer,
     name,
     price,
     bgcolor,
     panelcolor,
     textcolor,
   });

   req.flash("success", "Product created successfully");
   res.redirect("/owner/admin");
   } catch (error) {
        res.status(500).send(error.message);
   }
});

module.exports = router;
