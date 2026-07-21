import mongoose from "mongoose"
import shortid from "shortid";

const urlSchema = mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,
        default: shortid.generate()
    },
    redirectUrl:{
        type:String,
        required: true,
        
    },
    visitHistory: [{timestamp:{type:Number}}]
},{timestamps: true})

const URL = mongoose.model("url", urlSchema);

export default URL;