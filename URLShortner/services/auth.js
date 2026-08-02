import jwt from "jsonwebtoken"
const secret = "spiderman123"
//const sessionIdToUserMAP = new Map()

function setUser(user){
    //sessionIdToUserMAP.set(id, user)

     const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    }
    // console.log(secret);
    return jwt.sign(payload, secret)
}

function getUser(token){
   // return sessionIdToUserMAP.get(id)
   if(!token) return null;
//    console.log(secret);
   return jwt.verify(token,secret)
}

export{
    setUser,
    getUser
}