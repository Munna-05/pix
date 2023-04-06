import mongoose from "mongoose";

const ImageSchema = mongoose.Schema({
    imagePath:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model('Images',ImageSchema)