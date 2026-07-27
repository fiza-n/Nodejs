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

    return res.redirect("/")
}

async function handleUserLogin(req, res) {
    const {email, password} = req.body;

   const user =  await User.findOne({
        email, password
    })
    // console.log("Entered password:", `"${password}"`);
   
//     console.log(user)
//     console.log(req.body)
//     console.log(req.body.email);
//  console.log(req.body.password);
    // if(!user){
    //     return res.render("login", {
    //         error:"Invalid username or password"
    //     })
    // }

    if(!user){
        return res.json({
            status:"error",
            message:"invalid"
        })
    }
    // const sessionId = uuidv4()
    // setUser(sessionId, user)
    // res.cookie("uid", sessionId)

   
   const token =  setUser(user)
    //res.cookie("uid", token)
    // console.log(token)
    res.json({token})
    
   // return res.redirect("/")
}


export{
    handleUserSignup,
    handleUserLogin
}