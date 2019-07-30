const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const productRoutes = require('./api/routes/product');
const userRoutes = require('./api/routes/user');
const orderRoutes = require('./api/routes/order');

let PORT = process.env.PORT || 3000;

require('dotenv').config();

mongoose.connect(process.env.CON_STRING,{useNewUrlParser : true})
        .then(()=> console.log("Connected to the database"))
        .catch(err => console.log(err));

app.use("/uploads",express.static("uploads"));

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(cors());

app.use("/api/products/" , productRoutes);
app.use("/api/user/" , userRoutes);
app.use("/api/order",orderRoutes);


app.use(express.static("client"));
app.get("*",(req,res) => {
        res.sendFile(__dirname + "/client/index.html");
})

app.listen(PORT , () => console.log(`Now listening to port ${PORT}`));