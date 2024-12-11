import { Request, Response } from "express";
import {  userSchemaZod } from "../../type/zod";
import { UserSC, UserSchema } from "../../models/UserModels";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { User } from "../../type/type";

export const Sign = async (req: Request<{}, {}, User>, res: Response) => {
    try {
        const { name, password, email, number,pic ,Private} = req.body;

       
        
        const validationResult = userSchemaZod.safeParse(req.body);

        if (!validationResult.success) {
            return res.json({ error: true, message: validationResult.error.issues[0].message });
        }

        const existingUser: User | null = await UserSchema.findOne({
            $or: [{ email: email }, { number: number }]
        });
     
        

        if (existingUser) {
            return res.json({ error: true, message: "User already exists" });
        }

        // Hash the password
        try {

            

            const hash = bcrypt.hashSync(password, 10);

            const newUser: UserSC = await UserSchema.create({
                pic:pic,
                name: name,
                password: hash,
                email: email,
                number: number,
                Private:Private
                
            });

         
            const token = jwt.sign({ userId: newUser._id }, `${process.env.SECRET}`);



            return res.cookie("token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 60000 * 60000)
            })
            .json({ success: true,message:"user crete " });
        } catch (error) {
            console.log(error);
            return res.json({ error: true, message: error })

        }




    } catch (error) {
        console.error("Error during user sign-up:", error);
        return res.status(500).json({ error: true, message: "An error occurred during sign-up" });
    }
}
