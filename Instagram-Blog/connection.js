import mongoose from "mongoose"

async function DBConnect(url){
  return await mongoose.connect(url).then(()=>{
         console.log("Connected to MongoDB")
       }).catch((err)=>{
         console.log("Error connecting to MongoDB", err)
       })
    }
export default DBConnect;