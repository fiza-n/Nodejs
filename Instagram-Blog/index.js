import express from "express"
import path from "path"
import userRoute from "./routes/user.js"
import DBConnect from "./connection.js"


const app = express()
const PORT = 8000;

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get("/", (req,res)=>{
   return  res.render("home")
})
DBConnect("mongodb://localhost:27017/blogdb")

app.use(express.urlencoded({extended:false}))
app.use("/user", userRoute)

app.listen(PORT, ()=>{
    console.log(`Server has started on Port ${PORT}`)
})