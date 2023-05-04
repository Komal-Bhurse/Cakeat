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
    const user = await User.matchPassword(Email,Password)
    if(!user){
      return  res.json({massage:"plese enter valid email or password"});
    }
    
    const token = setUser(user);
    res.cookie("uid",token,{httpOnly:true,secure:true,domain:"cakeat-ecom.vercel.app",sameSite:"none"});
    return res.json({user:user});

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