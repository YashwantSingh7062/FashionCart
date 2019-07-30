const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,"./uploads/userImages");
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

const User = require('../models/user');
const Order = require('../models/order');
const checkAuth = require('../middlewares/checkAuth');

router.post("/login",(req,res) => {
    User.findOne({email : req.body.email})
        .then(result => {
            if(result){
                bcrypt.compare(req.body.password , result.password , (err,hashResult) => {
                    if(err){
                        res.status(401).json({
                            message : "Auth Failed"
                        });
                    }
                    if(hashResult){
                        let token = jwt.sign({_id : result._id , email : result.email},process.env.SECRET_KEY , {expiresIn : "1h"});
                        res.status(200).json({
                            message : "User Authenticated",
                            name : result.name,
                            token
                        })
                    }
                    else{
                        res.status(401).json({
                            message : "Auth Failed"
                        })
                    }
                })
            }
            else{
                res.status(401).json({
                    message : "Auth Failed"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
})

router.post("/signup",uploads.single('userImage'),(req,res) => {
    User.findOne({email : req.body.email})
        .then(result => {
            if(!result){
                bcrypt.hash(req.body.password , 10 , (err,hash) => {
                    if(err){
                        res.status(500).json({
                            message : "Something went wrong"
                        })
                    }
                    else{
                        let newUser = new User({
                            name : req.body.name,
                            email : req.body.email,
                            password : hash,
                            userImage : req.file.path,
                            address : req.body.address
                        })
                        newUser.save()
                            .then(result => {
                                res.status(200).json({
                                    message : "User Registered"
                                })
                            })
                            .catch(err => {
                                console.log(err);
                            }) 
                    }
                })
            }
            else{
                res.status(409).json({
                    message : "Email already exist"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error
            })
        })
})


router.get("/",checkAuth,(req,res) => {
    User.findOne({_id : req.user._id})
        .then(result => {
            if(result){
                res.status(200).json({
                    name : result.name,
                    email : result.email,
                    userImage : result.userImage,
                    address : result.address
                })
            }
            else{
                res.status(401).json({
                    message : "Access Denied"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
})
router.get("/deactivate",checkAuth,(req,res) => {
    User.deleteOne({_id : req.user._id})
        .then(result => {
            Order.deleteMany({user : req.user._id})
                .then(result => {
                    res.status(200).json({
                        message : "User Account Removed",
                        message2 : "User Orders deleted"
                    });
                }) 
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        });   
})

router.put("/",checkAuth,(req,res) => {
    User.updateOne({_id : req.user._id},{$set : {
        name : req.body.name,
        email : req.body.email,
        address : req.body.address
    }})
    .then(result => {
        res.status(200).json({
            message : "User Profile updated"
        })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
})
module.exports = router;