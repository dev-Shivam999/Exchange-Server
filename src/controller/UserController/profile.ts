import {  Response } from "express";
import { Picture, UserSC, UserSchema } from "../../models/UserModels";
import { su } from "../../type/type";
import { CustomRequest } from "../../utils/utils";

export const profile = async (req: CustomRequest,res:Response)=>{
    
  try {
       

        const userId = req.userId
          
        const existingUser: UserSC | null = await UserSchema.findById(userId);
       
        
        const Pic:su | null = await Picture.findOne({ UserId: existingUser?._id })
      
        
        
        if (existingUser ) {
          const url=Pic?.pic

          // Additional values to send
          const additionalValues = {
            _id: existingUser._id,
            name: existingUser.name,
            number: existingUser.number,
            email: existingUser.email
          };

          // Merge additional values with URL and existing user data
          const responseData = {
            // Convert existingUser to plain object
            url,
            ...additionalValues,
          };

     
       

              return res.json({ success: true, message: responseData })
          } else {
              return res.json({ success: false, message: "login sl first" })

          }
      
  } catch (error) {
    
    console.log("error",error);
    res.json({ success: false, message:"Login failed"})
    
  }

}