import {  Response } from "express";
import {  UserSC, UserSchema } from "../../models/UserModels";
import { CustomRequest } from "../../utils/utils";

export const profile = async (req: CustomRequest,res:Response)=>{
    
  try {
       

        const userId = req.userId
          
        const existingUser: UserSC | null = await UserSchema.findById(userId);
       
        

        
      
        
        
        if (existingUser ) {
        
          const pro=existingUser.Product.filter(p=>p.verify)

          const additionalValues = {
            _id: existingUser._id,
            name: existingUser.name,
            number: existingUser.number,
            email: existingUser.email,
            pic:existingUser.pic,
            product: pro,
            Private:existingUser.Private
           
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