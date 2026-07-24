import express from "express"
import DBConnect from "./connection.js"
import urlRoute from "./routes/routes.js"
import path from "path"
import staticRoute from "./routes/staticRouter.js"
import userRoute from "./routes/user.js"
import URL from "./models/url.js"

const app = express();
const PORT = 8000


 DBConnect("mongodb://127.0.0.1:27017/urldb")
//view ("engine
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({extended: false}))//middleware to support form data
app.set("views", path.resolve("./views"))



app.use("/url", urlRoute)
app.use("/", staticRoute)
app.use("/user", userRoute )
app.listen(PORT, ()=>{
    console.log(`Server has started on port ${PORT}`);
})

