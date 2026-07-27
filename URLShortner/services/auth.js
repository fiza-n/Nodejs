import jwt from "jsonwebtoken"
const secret = "noor123$$"
//const sessionIdToUserMAP = new Map()

function setUser(user){
    //sessionIdToUserMAP.set(id, user)

     const payload = {
        ...user
    }
    console.log(secret);
    return jwt.sign(payload, secret)
}

function getUser(token){
   // return sessionIdToUserMAP.get(id)
   if(!token) return null;
   console.log(secret);
   return jwt.verify(token,secret)
}

export{
    setUser,
    getUser
}