import { Request, Response } from "express";
import { LoginSchema, UserLogin } from "../../type/zod";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { SelUs } from "../../models/SelModels";
import {  s } from "../../type/type";

export const LoginSel = async (req: Request<{}, {}, UserLogin >, res: Response) => {
    try {
        const {  password, email } = req.body;

        const validationResult = LoginSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.json({ success: false, message: validationResult.error.issues[0].message });
        }

        const existingUser: s | null = await SelUs.findOne({ email: email });


        if (!existingUser) {
            return res.json({ success: false, message: "User not  exists" });
        }

        // Hash the password
        try {

            const hash2 = bcrypt.hashSync(password, 10)
            const hash=  bcrypt.compareSync(password,existingUser.password);

            

            if (hash) {
                
                const token = jwt.sign({ userId: existingUser._id }, `${process.env.SECRET}`);
   
    
    
                return res.cookie("token", token,{
                    httpOnly:true,
                    sameSite:true,
                    expires: new Date(Date.now() + 60000 * 60000)
                })
                    .json({ success: true, message: "user Login in  " });
            }else{
                return res.json({ success: false, message: " password  wrong" });
            }


        } catch (error) {
            console.log(error);
            return res.json({ success: false, message: error })

        }




    } catch (error) {
        console.error("Error during user sign-up:", error);
        return res.status(500).json({ error: true, message: "An error occurred during sign-up" });
    }
}
