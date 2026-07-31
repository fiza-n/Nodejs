import jwt from "jsonwebtoken"
const secret = "spiderman123"

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
        profileImage : user.profileImageUrl,

    }
    const token = jwt.sign(payload, secret, {
        expiresIn: "30d"
    })
    return token

}

function validateToken(token){
    return jwt.verify(token, secret)
}

export{
    validateToken,
    createTokenForUser
}