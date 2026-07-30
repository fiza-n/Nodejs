import express from "express"



const route = express.Router()

route.get("/add-new",(req,res)=>{
    res.render("addBlog",{
        user: req.user
    })
})


export default route