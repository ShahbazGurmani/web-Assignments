import jwt from "jsonwebtoken"
export const sendCookie = (user,res,statusCode=200)=>{
    const token = jwt.sign({_id:user._id},"jkejejl")
    
    res.status(statusCode).cookie("token",token,{
        httpOnly:true,
        maxAge:15*60*1000
    })
}