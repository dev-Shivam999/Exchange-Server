import { Request, Response } from "express";
import { UserCart } from "../../models/UserModels";
import { UserCart as u } from "../../type/type";
import jwt, { JwtPayload } from "jsonwebtoken";
import { log } from "console";
import { CustomRequest } from "../../utils/utils";

export const CheckCart = async (req: CustomRequest, res: Response) => {

    const { id } = req.body
   
    
 
        
            const userId =req.userId;
            
            const data: u | null = await UserCart.findOne({userId:userId})
            
          if (data) {
              

            const val=data.product.filter(p=>p._id==id)
            
            if (val.length > 0) {
                res.json({success: true})
            }else{
                res.json({success: false})

            }
          }else{

              res.json({ success: false })
          }

           


}