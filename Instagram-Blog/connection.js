import mongoose from "mongoose"

async function DBConnect(url) {
  try {
    await mongoose.connect(url)
    console.log("Connected to MongoDB")
    return true
  } catch (err) {
    console.log("Error connecting to MongoDB", err)
    throw err
  }
}

export default DBConnect;