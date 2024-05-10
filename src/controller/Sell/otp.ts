import { Request, Response } from "express";
import { SelUs } from "../../models/SelModels";
import { s } from "../../type/type";
import  jwt from "jsonwebtoken";

import bcrypt from "bcrypt"
export const opt=async(req:Request,res:Response)=>{



    const otp = Math.floor(100000 + Math.random() * 900000);
    const name=req.cookies.name
    const email=req.cookies.email
    const password=req.cookies.password
    const number=req.cookies.number
    const verifyOtp=req.body.otp


    

    if (verifyOtp==opt) {
        
        const hash = bcrypt.hashSync(password, 10);
        
        
        const newUser: s = await SelUs.create({
                name: name,
                password: hash,
                email: email,
                number: number,
                otp: otp
            });
            
                const token = jwt.sign({ userId: newUser._id }, "lol");
            
            
            res.cookie("token", token)
        }
}