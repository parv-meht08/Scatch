const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const ProductModel = require("../models/product.model"); 

module.exports.registerUser = async (req, res) => {
    try {
        let {email, fullname, password} = req.body;

        let user = await userModel.findOne({email: email});
        if(user){
            return res.status(400).send("User already exists");
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if(err) return res.status(500).send(err.message);
                else{
                    let createdUser = await userModel.create({
                        fullname,
                        email,
                        password: hash,
                    });

                    let token = generateToken(createdUser);

                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: true
                    })
                    res.status(201).send("user created successfully");
                }
            });
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email: email });
        if (!user) {
            return req.flash("error", "User not found");
        }

        bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true
                });

                req.flash("success", "Successfully logged in!");
                res.redirect("/shop"); // Redirect to /shop after successful login
            } else {
                req.flash("error", "Invalid Credentials");
                res.redirect("/");
            }
        });
    } catch (error) {
        req.flash("error", "Invalid Credentials");
        res.redirect("/");
    }
};

module.exports.logoutUser = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};