import express from "express"
import DBConnect from "./connection.js"
import urlRoute from "./routes/routes.js"
import path from "path"
import staticRoute from "./routes/staticRouter.js"
import userRoute from "./routes/user.js"
import URL from "./models/url.js"
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser"
import {restrictToLoggedInUserOnly, checkAuth} from "./middlewares/auth.js"

const app = express();
const PORT = 8000


 DBConnect("mongodb://127.0.0.1:27017/urldb")
//view ("engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.urlencoded({extended: false}))//middleware to support form data
app.use(cookieParser())
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//routes

app.use("/url",restrictToLoggedInUserOnly, urlRoute)
app.use(express.json())
app.use("/user", userRoute )
app.use("/",checkAuth, staticRoute)
app.listen(PORT, ()=>{
    console.log(`Server has started on port ${PORT}`);
})

