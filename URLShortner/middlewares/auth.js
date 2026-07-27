import {getUser} from "../services/auth.js"

async function checkForAuthentication(req, res, next){
    const tokenCookie = req.cookies?.token
    req.user = null

    if(!tokenCookie )
        return next()

    const token = tokenCookie
    const user = getUser(token)

    req.user = user;
    return next()
}

function restrictTo(role = []){
    return function(req, res, next){
        if(!req.user) return res.redirect("/login")

        if(!role.includes(req.user.role)) return res.end("UnAuthorized")

        return next()
    }
}

//FOR AUTHENTICATION
// async function restrictToLoggedInUserOnly(req,res,next){
//     //const userUid = req.cookies?.uid
//     const userUid = req.headers["Authorization"]
//     if(!userUid)return res.redirect("/login")

//     const token = userUid.split("Bearer ")[1];
//     const user = getUser(token)
//     if(!user) return res.redirect("/login")

//     req.user = user
//     next()
// }

// async function checkAuth(req,res,next){
//    //const userUid = req.cookies?.uid
//  const userUid = req.headers["authorization"]
// //   console.log(req.headers)
//   console.log(req.headers.authorization)
//  const token = userUid.split("Bearer ")[1];
//  console.log(token)
//     const user = getUser(token)

//     req.user = user
//     next()
// }

export{
    // restrictToLoggedInUserOnly,
    // checkAuth,
    checkForAuthentication,
    restrictTo
}