// import { Request, Response } from "express";
// import jwt,{ JwtPayload } from "jsonwebtoken";
// import { UserCart, UserSC, UserSchema } from "../../models/UserModels";
// import { UserCart as u } from "../../type/type";
// import { CustomRequest } from "../../utils/utils";

// export const GetCart = async (req:CustomRequest, res: Response) =>{
   
//         const userId = req.userId;
// const p:null|UserSC=await UserSchema.findById(userId);

//      if (p) {
//          const data: u | null = await UserCart.findOne({ userId: userId })

//          res.json({ success: true, message: data?.product })
         
//         }else{
//          res.json({ success: false, message: "login first" })

//      }


// }