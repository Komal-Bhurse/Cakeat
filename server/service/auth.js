const jwt = require("jsonwebtoken");

const dotenv = require("dotenv")
dotenv.config({path:'../config/.env'})

function setUser(user){
    
    return jwt.sign({
       _id: user._id,
       email: user.Email
    },process.env.JWT_SECRET_KEY)
}

function getUser(token){
    if(!token){
        return null;
    }else{
        try {
            return jwt.verify(token,process.env.JWT_SECRET_KEY);
        } catch (error) {
            return null
        }
        
    }
    
}

module.exports = {
    setUser,
    getUser,
}
