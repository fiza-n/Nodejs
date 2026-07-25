const sessionIdToUserMAP = new Map()

function setUser(id, user){
    sessionIdToUserMAP.set(id, user)
}

function getUser(id){
    return sessionIdToUserMAP.get(id)
}

export{
    setUser,
    getUser
}