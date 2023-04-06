import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
   Name:{
    type:String,
    required:true
   },
   Lastname:{
    type:String,
    required:true
   },
   Email:{
    type:String,
    required:true
   },
   Password:{
    type:String,
    required:true,
   },
   apikey:{
      type:String,
      default:null
   }
   
   
},{timestamps:true})

export default mongoose.model('Users',UserSchema)  