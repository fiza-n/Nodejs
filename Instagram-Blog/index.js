import express from "express"
import path from "path"
import userRoute from "./routes/user.js"
import DBConnect from "./connection.js"
import { checkForAuthentication } from "./middlewares/auth.js"
import cookieParser from "cookie-parser"
import blogRoute from "./routes/blog.js"



const app = express()
const PORT = 8000;

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

DBConnect("mongodb://127.0.0.1:27017/blogdb")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthentication)

app.get("/", (req,res)=>{
    res.render("home", {
        user: req.user
    })
})
app.use("/user",userRoute)
app.use("/blog",blogRoute)

app.listen(PORT, ()=>{
    console.log(`Server has started on Port ${PORT}`)
})