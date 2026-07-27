import {getUser} from "../services/auth.js"

async function restrictToLoggedInUserOnly(req,res,next){
    //const userUid = req.cookies?.uid
    const userUid = req.headers["Authorization"]
    if(!userUid)return res.redirect("/login")

    const token = userUid.split("Bearer ")[1];
    const user = getUser(token)
    if(!user) return res.redirect("/login")

    req.user = user
    next()
}

async function checkAuth(req,res,next){
   //const userUid = req.cookies?.uid
 const userUid = req.headers["authorization"]
//   console.log(req.headers)
  console.log(req.headers.authorization)
 const token = userUid.split("Bearer ")[1];
 console.log(token)
    const user = getUser(token)

    req.user = user
    next()
}

export{
    restrictToLoggedInUserOnly,
    checkAuth
}