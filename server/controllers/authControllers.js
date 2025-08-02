const User = require("../models/userModel");
const login = (req, res) => {};
const signup = async(req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({email:email})
  if(user){
    return res.status(409).json({message:"User already registred"})
  }
  user = new User({name:name,email:email,password:password})
  await user.save()
  return res.status(200).json({message:"User registration sucess"})
};
const signupget = (req,res)=>{
  console.log("sign up get route")
}
module.exports = { login, signup,signupget };
