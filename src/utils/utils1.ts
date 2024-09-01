import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { s } from "../type/type";
export interface CustomRequest extends Request {
    userId?: string; // userId property is optional
}
import { config } from "dotenv";
import { UserSchema } from "../models/UserModels";
config()
export const val2 = async (req: CustomRequest, res: Response, next: NextFunction) => {

    const token: string | undefined = await req.cookies.token;


    if (token == undefined) {
        return res.json({ success: false, message: "Login first" })
    }
    else {


        let decodedToken: JwtPayload | string;
        try {
            decodedToken = jwt.verify(token, `${process.env.SECRET}`);
        } catch (error) {
            console.error("Error verifying token:", error);
            return res.status(400).json({ success: false, message: 'Invalid token' });
        }

        // Check if the decoded token contains user ID
        if (typeof decodedToken === 'string' || !decodedToken.userId) {
            console.error("Invalid token payload:", decodedToken);
            return res.status(400).json({ success: false, message: 'Invalid token payload' });
        }

        let userId = String(decodedToken.userId);




        const existingUser: s | null = await UserSchema.findById(userId);




        if (existingUser == null) {
            return res.json({ success: false, message: "login  " })

        } else {
            req.userId = userId;

            next()
        }
    }


}