import User from "../models/users.js";
import {v4 as uuidv4} from "uuid"
import {setUser} from "../services/auth.js"

async function handleUserSignup(req, res) {
    const {name, email, password} = req.body;
 
    await User.create({
        name,
        email,
        password
        

    })

    return res.render("home")
}

async function handleUserLogin(req, res) {
    const {email, password} = req.body;

   const user =  await User.findOne({
        email, password
    })
    console.log(user)
    if(!user){
        return res.render("login", {
            error:"Invalid username or password"
        })
    }
    const sessionId = uuidv4()
    setUser(sessionId, user)
    res.cookie("uid", sessionId)
    return res.redirect("/")
}


export{
    handleUserSignup,
    handleUserLogin
}