import 'dotenv/config'
import express from "express"
import path from "path"
import userRoute from "./routes/user.js"
import DBConnect from "./connection.js"
import { checkForAuthentication } from "./middlewares/auth.js"
import cookieParser from "cookie-parser"
import blogRoute from "./routes/blog.js"
import Blog from "./models/blog.js"



const app = express()
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

DBConnect(process.env.MONGO_URL)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthentication)
app.use(express.static(path.resolve("./public")))


app.get("/", async (req,res)=>{
  const allBlogs = await Blog.find({}).populate("createdBy", "fullname profileImageUrl")
    res.render("home", {
        user: req.user,
        blogs: allBlogs
    })
})
app.use("/user",userRoute)
app.use("/blog",blogRoute)

app.listen(PORT, ()=>{
    console.log(`Server has started on Port ${PORT}`)
})