import {validateToken} from "../services/auth.js"

async function checkForAuthentication(req, res, next){
    const tokenCookie = req.cookies?.token
    req.user = null

    if(!tokenCookie)
        return next()

    try {
        req.user = validateToken(tokenCookie)
    } catch (err) {
        console.log("Invalid token:", err.message)
        req.user = null
    }

    return next()
}

function restrictTo(role = []){
    return function(req, res, next){
        if(!req.user) return res.redirect("/login")

        if(!role.includes(req.user.role)) return res.end("UnAuthorized")

        return next()
    }
}
export{
    checkForAuthentication,
    restrictTo
}