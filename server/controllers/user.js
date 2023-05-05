const User = require("../models/user");
const {setUser} = require("../service/auth");
                    
const handleSignUp = async(req,res)=>{
    const data = req.body
    const result = await User.create({
        UserName:data.name,
        Email:data.email,
        MobNumber:data.mobNumber,
        Password:data.password,
    })
    
    return res.status(201).json({massage:"sucsess"})
}
                       
const handleSignIn = async(req,res)=>{
    const {Email,Password} = req.body;
    try {
        const user = await User.matchPassword(Email,Password)
    if(!user){
      return  res.json({massage:"plese enter valid email or password"});
    }
    console.log(user)
    const token = setUser(user);
    console.log(token)
    res.cookie("uid",token);
    return res.json({user:user});

    } catch (error) {
       return res.json({massage:error});
    }
}

const handleLogout =(req,res)=>{
    res.clearCookie("uid");
    res.send({massage:"logout successfull"});
}

module.exports = {
   handleSignUp,
   handleSignIn,
   handleLogout
};