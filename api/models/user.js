const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name : {type : String , required : true},
    email : { type : String,required:true},
    password : { type : String ,required : true},
    userImage : { type : String },
    address : { type : String, required : true}
});

let User = mongoose.model("users",UserSchema);

module.exports = User;