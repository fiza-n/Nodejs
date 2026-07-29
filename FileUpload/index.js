import express from "express"
import path from "path"
import multer from "multer"


const app = express()
const PORT = 8000

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended:false}))

app.get("/", (req, res)=>{
    return res.render("home")
})
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname
    cb(null,  uniqueSuffix)
  }
})
const upload = multer({ storage: storage })

app.post("/upload",upload.single("profileImage"), (req, res)=>{
    console.log(req.body)
    console.log(req.file)

    return res.redirect("/")
})
app.listen(PORT, ()=>{
    console.log(`Server has been started on Port ${PORT}`)
})