import express from "express"
import URL from "../models/url.js";

const staticRoute = express.Router();

staticRoute.get("/", async (req,res)=>{
    const allUrls = await URL.find({})
    return res.render("home", {
        urls: allUrls
    })
})

staticRoute.get("/signup",(req,res)=>{
    return res.render("signup")
})
export default staticRoute;