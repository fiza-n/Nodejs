import express from "express"
import path from "path"
import userRoute from "./routes/user.js"
import DBConnect from "./connection.js"
import { checkForAuthentication } from "./middlewares/auth.js"
import cookieParser from "cookie-parser"
import blogRoute from "./routes/blog.js"
import multer from "multer"


const app = express()
const PORT = 8000;

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

DBConnect("mongodb://localhost:27017/blogdb")

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthentication)

app.get("/", (req,res)=>{
    res.render("home", {
        user: req.user
    })
})
app.use("/user",userRoute)
app.use("/blog",blogRoute)

//upload cover image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/uploads`)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname
    cb(null,  uniqueSuffix)
  }
})
 const upload = multer({ storage: storage })

blogRoute.post("/upload",upload.single("coverImage"), (req, res)=>{
    console.log(req.file)
    console.log(req.body)

    return res.redirect("/")
})

app.listen(PORT, ()=>{
    console.log(`Server has started on Port ${PORT}`)
})