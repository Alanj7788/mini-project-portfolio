const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  isadmin:{type:Boolean,default:false,required:true},
  
  email: { type: String, required: true, unique: true },
  id:{type:String,required:true,unique:true},
  password: { type: String, required: true },
  firstName:{type: String,required:true},
  lastName:{type:String,required:true},
  sem:{type:String,required:true},
  skills:{type:Array,required:true},
});


const ideaSchema= new mongoose.Schema({
  ownerid:{type:String},
  firstName:{type: String,required:true},
  lastName:{type:String,required:true},
  idea:{type:String,required:true},
  date: {type:String,required:true},
  likes:{type:Array,required:true},
});





module.exports={
    User:mongoose.model("users",userSchema),
    Idea:mongoose.model("ideas",ideaSchema),
}

{/*likes: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming likes are associated with users
    // You can add more properties here such as date/time of like, etc.
  }]*/}