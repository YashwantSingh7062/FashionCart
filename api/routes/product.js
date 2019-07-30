const express = require('express');
const router = express.Router();

const Products = require('../models/product');

const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,"./uploads/products");
    },
    filename : (req,file,cb) => {
        cb(null,Date.now() + file.originalname);
    }
})
const fileFilter = (req,file,cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}
const uploads = multer({
    storage,
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter
});

router.get("/",(req,res) => {
    Products.find({})   
            .then( result => {
                res.status(200).json({
                    message : "Find all the products from the products collection",
                    count : result.length,
                    products : result
                })
            })
            .catch( error => {
                res.status(500).json({
                    error
                })
            })
})

router.post("/",uploads.single("image"),(req,res)=> {
    let newProduct = new Products({
        name : req.body.name,
        brand : req.body.brand,
        price : req.body.price,
        image : req.file.path
    })

    newProduct.save()   
                .then(result => {
                    res.status(200).json({
                        message : "Product saved"
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error : err
                    })
                })
})
module.exports = router;