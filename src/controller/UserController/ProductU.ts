import { Request, Response } from "express";
import { SelModel } from "../../models/SelModels";
import { SelProduct } from "../../type/type";

export const Product = async (req: Request, res: Response) => {

    

    const D: SelProduct[] | null = await SelModel.find({verify:true})

    if (D) {
        return res.json({ success: true, message: D })
    } else {
        return res.json({ success: false, message: "Invalid" })
    }


}