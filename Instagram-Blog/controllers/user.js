import User from "../models/user.js";
import bcrypt from "bcrypt";

async function hashPassword(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function handleUserSignup(req, res) {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.redirect("/signup")

    const user = await User.create({
      fullname,
      email,
      password: await hashPassword(password),
    });

    return res.redirect("/")
  } catch (error) {
    console.log(error)
   
  }
}

async function handleUserSignin(req,res) {
    const {email, password} = req.body
   const user = await User.findOne({ email });

   if(!user) return res.redirect("/login")

    const result = await bcrypt.compare(password, user.password )

if (!result) {
    throw new Error("User not found")
} 
return res.redirect("/")
}

export{
    handleUserSignup,
    handleUserSignin
}
