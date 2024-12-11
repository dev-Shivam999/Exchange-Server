import { Request, Response } from "express";
import { LoginSchema, UserLogin } from "../../type/zod";
import { UserSC, UserSchema } from "../../models/UserModels";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const Login = async (req: Request<{}, {}, UserLogin >, res: Response) => {
    try {
        const {  password, email } = req.body;

        const validationResult = LoginSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.json({ success: false, message: validationResult.error.issues[0].message });
        }

        const existingUser: UserSC | null = await UserSchema.findOne({ email: email });

        if (!existingUser) {
            return res.json({ success: false, message: "User not  exists" });
        }

        // Hash the password
        try {

            const hash=  bcrypt.compareSync(password,existingUser.password);

            

            if (hash) {
                
                const token = jwt.sign({ userId: existingUser._id }, `${process.env.SECRET}`);
   
    
                return res.cookie("token", token, {
                    httpOnly: true,
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
