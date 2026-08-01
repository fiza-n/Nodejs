import express from "express"
import { upload } from "../middlewares/mutler.js"
import Blog from "../models/blog.js"
import { handleBlogCreation ,handleGetBlogById, handleBlogComments} from "../controllers/blog.js"

const route = express.Router()

route.get("/add-new", (req, res) => {
    res.render("addBlog", {
        user: req.user
    })
})

route.post("/comment/:blogId", handleBlogComments)

route.post("/",upload.single("coverImageUrl"),handleBlogCreation) 

route.get("/:id", handleGetBlogById)

export default route