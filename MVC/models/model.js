import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  job_title:{
    type:String,
    required: true
  }
})
//Model
const User = mongoose.model("user", userSchema)
//connect to mongodb



export default User;