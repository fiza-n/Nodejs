import express from "express"
import URL from "../models/url.js";

const staticRoute = express.Router();

staticRoute.get("/", async (req,res)=>{
    const allUrls = await URL.find({})
    return res.render("home", {
        urls: allUrls
    })
})
export default staticRoute;