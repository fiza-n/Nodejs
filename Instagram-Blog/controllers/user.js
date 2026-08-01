import User from "../models/user.js";
import bcrypt from "bcrypt";
import { createTokenForUser } from "../services/auth.js";

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

    if (existingUser) return res.redirect("/user/signup");

    const user = await User.create({
      fullname,
      email,
      password: await hashPassword(password),
    });

    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

async function handleUserSignin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).render("signup", {
        error: "User not found with the provided email",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).render("signin", {
        error: "Incorrect email or password",
      });
    }

    const token = createTokenForUser(user);
    res.cookie("token", token);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).render("signin", {
      error: "Incorrect email or password",
    });
  }
}

async function handleUserSignout(req,res){
    return res.clearCookie("token").redirect("/")
}

export { handleUserSignup, handleUserSignin ,handleUserSignout};
