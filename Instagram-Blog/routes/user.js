import express from "express"
import {handleUserSignup, handleUserSignin,handleUserSignout} from "../controllers/user.js"
import { checkForAuthentication } from "../middlewares/auth.js"

const route = express.Router()

route.get("/signup", (req,res)=>{
    return res.render("signup")
})

route.get("/signin", (req,res)=>{
    return res.render("signin")
})
route.post("/signin", handleUserSignin)
route.post("/signup", handleUserSignup)
route.get("/signout",handleUserSignout)

export default route;