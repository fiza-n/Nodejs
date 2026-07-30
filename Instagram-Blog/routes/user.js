import express from "express"
import {handleUserSignup, handleUserSignin} from "../controllers/user.js"

const route = express.Router()

route.get("/signup", (req,res)=>{
    return res.render("signup")
})

route.get("/signin", (req,res)=>{
    return res.render("signin")
})
route.post("/signin", handleUserSignin)

route.post("/signup", handleUserSignup)

export default route;