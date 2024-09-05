import { Request, Response } from "express";
import { s } from "../../type/type";
import { UserSchema } from "../../models/UserModels";

export const Number = async (req: Request, res: Response)=>{

    const {userId}=req.body

    
    const data:s|null=await UserSchema.findById(userId)
    
    
    if (data) {
        const some=data.number
        

        res.json({success:true,message:some})

    }else{
        res.json({success:false,message:"Product Seller not found plz try again"})
    }

}