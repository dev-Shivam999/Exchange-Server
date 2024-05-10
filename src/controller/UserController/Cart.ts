import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserCart, UserSC, UserSchema } from "../../models/UserModels";
import { SelProduct, Uc } from "../../type/type";
import { SelModel } from "../../models/SelModels";
import { CustomRequest } from "../../utils/utils";

export const Cart = async (req: CustomRequest, res: Response) => {

    const { id }: { id: string } = req.body



   try {
     

       const userId =req.userId
           const Pro: null | SelProduct = await SelModel.findById(id)
            if (!Pro) {
               return res.json({ success: false, message: '"error"' })
           }
           const p:null|UserSC=await UserSchema.findById(userId)
          if (p) {
              const val: Uc | null = await UserCart.findOne({ userId: userId })
              if (val) {
                  const al = val.product.find(p => p._id == id)
                  if (al) {

                      const pro2 = val.product.filter(p => p._id != id)


                      await UserCart.findOneAndUpdate({ userId: userId }, { $set: { product: pro2 } })
                      res.json({ success: true, message: "delete" })
                  } else {
                      await UserCart.findOneAndUpdate({ userId: userId }, { $push: { product: Pro } })
                      res.json({ success: true, message: "update" })
                  }

              } else {
                  await UserCart.create({
                      userId: userId,
                      product: Pro
                  })
                  res.json({ success: true, message: "create" })
                }
                
            }else{
                
                res.json({ success: false, message: "Login" })
          }

       }
      
   catch (error) {
    console.log(error);
    
   }
} 