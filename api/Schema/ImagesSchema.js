import mongoose from "mongoose";

const ImageSchema = mongoose.Schema({
    imagePath:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    thumbs:{
        type:Object
    }
},{timestamps:true})

export default mongoose.model('Images',ImageSchema)