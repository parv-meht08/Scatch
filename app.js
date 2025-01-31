const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const db = require("./config/db");
const ownerRoute = require("./routes/owner.route");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const indexRoute = require("./routes/index");
const expressSession = require("express-session");
const flash = require("connect-flash");
const env = require("dotenv");

env.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owner", ownerRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/", indexRoute);

app.listen(3000);
