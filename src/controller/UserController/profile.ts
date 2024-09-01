import {  Response } from "express";
import { Picture, UserSC, UserSchema } from "../../models/UserModels";
import { su } from "../../type/type";
import { CustomRequest } from "../../utils/utils";
import { log } from "console";

export const profile = async (req: CustomRequest,res:Response)=>{
    
  try {
       

        const userId = req.userId
          
        const existingUser: UserSC | null = await UserSchema.findById(userId);
       
        

        
      
        
        
        if (existingUser ) {
        
          

          const additionalValues = {
            _id: existingUser._id,
            name: existingUser.name,
            number: existingUser.number,
            email: existingUser.email,
            pic:existingUser.pic,
            product: existingUser.Product
           
          };

        

     
       

              return res.json({ success: true, message: additionalValues })
          } else {
              return res.json({ success: false, message: "login sl first" })

          }
      
  } catch (error) {
    
    console.log("error",error);
    res.json({ success: false, message:"Login failed"})
    
  }

}