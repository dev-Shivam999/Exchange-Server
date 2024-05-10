import { Request, Response } from "express";
import { SelModel } from "../../models/SelModels";
import { SelProduct } from "../../type/type";

export const ProductInfo = async (req: Request, res: Response)=>{

try {
    const {id}: {id:string} = req.body
  


    const data: SelProduct | null = await SelModel.findById(id)
    if (data) {

        return res.json({ success: true, message: data })
    }
    return res.json({ success: false, message: "try again" })
    
} catch (error) {
    console.log(error);
    return res.json({ success: false, message: "try again" })
    
}
}