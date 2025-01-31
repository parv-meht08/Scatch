const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        req.flash("error", "Please login first");
        return res.redirect("/");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ email: decoded.email }).select("-password");
        if (!user) {
            return res.status(401).send("Unauthorized");
        }
        req.user = user;
        next();
    } catch (error) {
        res.redirect("/");
    }
}