const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner.model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owner = await ownerModel.find();
    if (owner.length > 0) {
      return res.status(503).send("You don't have permission to create new Owner.");
    }

    let {fullname, email, password} = req.body;

    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });

    res.status(201).send(createdOwner); 
  });
}

router.get("/admin", (req, res) => {
  res.render("createproducts", { success: req.flash("success") });
});

module.exports = router;
