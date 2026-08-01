import 'dotenv/config'
import jwt from "jsonwebtoken"


function createTokenForUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
        profileImage : user.profileImageUrl,

    }
    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "30d"
    })
    return token

}

function validateToken(token){
    return jwt.verify(token, process.env.SECRET)
}

export{
    validateToken,
    createTokenForUser
}