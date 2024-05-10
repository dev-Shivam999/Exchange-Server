import {  Response } from "express";
import { SelUs } from "../../models/SelModels";
import { s } from "../../type/type";
import { CustomRequest } from "../../utils/utils";

export const Product = async (req: CustomRequest,res:Response)=>{



    const userId =req.userId 

    const D:s|null = await SelUs.findById(userId)
    
    
    if(D){
        return res.json({ success: true, message: D.Product })
    }else{
        return res.json({ success: false, message:"Invalid"})
    }


}