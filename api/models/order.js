const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OrderSchema = new Schema({
    user : {type:mongoose.Schema.Types.ObjectId , required : true,ref : "users"},
    products : [{type : mongoose.Schema.Types.ObjectId , required : true,ref : "products"}],
    date : {type : Date , default : Date.now()}
})

let Order = mongoose.model("orders" , OrderSchema);

module.exports = Order;