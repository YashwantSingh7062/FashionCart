const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name : {type : String,required : true},
    brand : {type : String,required : true},
    price : {type : Number,required : true},
    image : {type : String,required : true}
})

let Product = mongoose.model("products",ProductSchema);

module.exports = Product;