const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = require("../config/keys")

function setUser(user){
    
    return jwt.sign({
       _id: user._id,
       email: user.Email
    },JWT_SECRET_KEY)
}

function getUser(token){
    if(!token){
        return null;
    }else{
        try {
            return jwt.verify(token,JWT_SECRET_KEY);
        } catch (error) {
            return null
        }
        
    }
    
}

module.exports = {
    setUser,
    getUser,
}
