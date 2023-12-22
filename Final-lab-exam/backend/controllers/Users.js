import { User } from "../models/Users.js"
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
 import { sendCookie } from "../utils/features.js";
import cookieParser from "cookie-parser";


export const Register = async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({
        success: false,
        msg: "user already existed",
      });
    }
   else{
    const hashedPassword = await bcrypt.hash(password,10);
  
    user = await User.create({
      name,
      email,
      password:hashedPassword
    });
    sendCookie(user, res, 201);

    return res.json({
      success: true,
      message:"User craeted Successfully"
    })

   }
};
  

//login controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    return res.status(404).json({
      success: false,
      msg: "user does not exist",
    });
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.status(404).json({
      success: false,
      msg: "invalid password",
    });
  }

  sendCookie(user, res, "signed in successfully", 201);

  return res.json({
    success: true,
  });
};


  export const logout = (req,res)=>{
    res.status(200).cookie("token",null,{
            expires:new Date(Date.now())
    }).json({
        success:true
    })
  }