const express = require('express');
const router = express.Router();

const Order = require('../models/order');
const checkAuth = require('../middlewares/checkAuth');

router.post("/",checkAuth,(req,res) => {
    let newOrder = new Order({
        user : req.user._id,
        products : req.body.productIds
    })

    newOrder.save()
            .then(result => {
                res.status(200).json({
                    message : "Order Placed"
                })
            })
            .catch(error => {
                res.status(500).json({
                    error
                })
            })
})


router.get("/",checkAuth,(req,res) => {
    Order.find({user : req.user._id})
        .populate("user", "name userImage address")
        .populate('products')
        .then(result => {
            if(result){
                res.status(200).json({
                    orders : result
                })
            }
            else{
                res.status(200).json({
                    message : "There are not orders to show"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
})

module.exports = router;

