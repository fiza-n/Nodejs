import express from "express"
import URL from "../models/url.js";

const staticRoute = express.Router();

staticRoute.get("/", async (req,res)=>{
    if(!req.user) return res.render("login")
   
    const allUrls = await URL.find({createdBy: req.user._id})
    return res.render("home", {
        urls: allUrls
    })
})

staticRoute.get("/signup",(req,res)=>{
    return res.render("signup")
})


staticRoute.get("/login",(req,res)=>{
    return res.render("login")
})
export default staticRoute;