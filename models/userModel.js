const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  id:{type:String,required:true,unique:true},
  password: { type: String, required: true },
  firstName:{type: String,required:true},
  lastName:{type:String,required:true},
  sem:{type:String,required:true},
  skills:{type:Array,required:true},
});






module.exports={
    User:mongoose.model("users",userSchema),
}