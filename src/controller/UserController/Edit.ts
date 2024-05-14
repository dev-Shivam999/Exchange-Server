import { Response } from "express";
import { CustomRequest } from "../../utils/utils";
import { UserSchema } from "../../models/UserModels";

export const Edit = async (req: CustomRequest, res: Response) => {
    try {
        const { p } = req.body
        const userId = req.userId
        
       const data= await UserSchema.findByIdAndUpdate(userId, { $set: { name: p.name, email: p.email, number: p.number } })
     
       return res.json({success:true})
       
    } catch (error) {
        console.log(error);
        return res.json({ success: false })

    }


}