import { Request, Response } from "express";
import {  userSchemaZod } from "../../type/zod";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { UserSel, s } from "../../type/type";
import { SelUs } from "../../models/SelModels";

export const SignSel = async (req: Request<{}, {}, UserSel>, res: Response) => {
    try {
        const { name, password, email, number } = req.body;

        const validationResult = userSchemaZod.safeParse(req.body);

        if (!validationResult.success) {
            return res.json({ error: true, message: validationResult.error.issues[0].message });
        }

        const existingUser: UserSel | null = await SelUs.findOne({ email: email });
        const existingUser2: UserSel | null = await SelUs.findOne({ number: number });

        if (existingUser||existingUser2) {
            return res.json({ error: true, message: "User already exists" });
        }

        // Hash the password
        try {

            


         
           
            // const token = jwt.sign({ userId: newUser._id }, "lol");
            const hash = bcrypt.hashSync(password, 10);


            const newUser: s = await SelUs.create({
                name: name,
                password: hash,
                email: email,
                number: number,
            });

            const token = jwt.sign({ userId: newUser._id }, `${process.env.SECRET}`);


            return res.cookie("token", token, {
                httpOnly: true,
                sameSite: true,
                expires: new Date(Date.now() + 60000 * 60000)
            })

            // .cookie("token", token)
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
