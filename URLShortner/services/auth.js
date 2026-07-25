import jwt from "jsonwebtoken"
const secret = "fiza123$$"
//const sessionIdToUserMAP = new Map()

function setUser(user){
    //sessionIdToUserMAP.set(id, user)

     const payload = {
        ...user
    }
    return jwt.sign(payload, secret, 
        {
            expiresIn: "1h"
        }
    )
}

function getUser(token){
   // return sessionIdToUserMAP.get(id)
   if(!token) return null;
   return jwt.verify(token,secret)
}

export{
    setUser,
    getUser
}