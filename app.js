const cookieParser = require('cookie-parser');
const express = require('express')
const app = express();
const path = require('path');
const db = require('./config/db');
const ownerRoute = require('./routes/owner.route');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');

app.use(express());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs");

app.use("/owner", ownerRoute);
app.use("/user", userRoute);
app.use("/product", productRoute)

app.listen(3000)
