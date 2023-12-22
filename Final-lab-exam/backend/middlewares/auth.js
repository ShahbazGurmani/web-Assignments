import { User } from "../models/Users.js";
import jwt from 'jsonwebtoken'
export const isAuthenticated = async (req,res,next)=>{

    const  {token}= req.cookies;
    if(!token){
      return res.status(404).json({
        success:false,
        msg:"login first"
      });
    
    }
    const decoded = jwt.verify(token,process.env.JWT_Secret)
     req.user = await User.findById(decoded._id)
     next();
}
