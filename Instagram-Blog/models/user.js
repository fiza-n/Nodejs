import {mongoose, model} from "mongoose";



const userSchema = new mongoose.Schema({
    uid:{

    },
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, "PLease provide a valid email address"],
    },
    password:{
        type:String,
        required: [true, "Password is required"],
        length: [6, "Password must be 6 characters or more"],
    },
   profileImageUrl:{
    type:String,
    default: "./images/userIcon"
   },
   role:{
    type:String,
    enum: ["USER", "ADMIN"],
    default:"USER"
   }
    
}, {timestamps: true})

const User = mongoose.model("user", userSchema)

export default User;