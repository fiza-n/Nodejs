import express from "express"
import URL from "../models/url.js";
import { restrictTo } from "../middlewares/auth.js";

const staticRoute = express.Router();

staticRoute.get("/admin/urls", restrictTo(["ADMIN"]),  async (req,res)=>{
    const allUrls = await URL.find({})
    return res.render("home", {
        urls: allUrls
    })
})

staticRoute.get("/",restrictTo(["NORMAL","ADMIN"]), async (req,res)=>{
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