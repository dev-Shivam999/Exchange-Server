import { Response } from "express";
import { SelModel, SelUs } from "../../models/SelModels";
import { SelProduct, s } from "../../type/type";
import { CustomRequest } from "../../utils/utils";

export const DeleteProduct = async (req: CustomRequest, res: Response) => {
  try {
      
      const {e}  = req.body;
      const userId = req.userId
      
      if (userId) {
          const data: SelProduct | null = await SelModel.findById(e)
          const user: s | null = await SelUs.findById(userId)
         
          if (data && user) {
              if (String(data.userId) == userId) {
                  await SelModel.findByIdAndDelete(e)
                  const data = user.Product.filter(p => p._id != e)
                  await SelUs.findByIdAndUpdate(userId, { $set: { Product: data } })
                  return res.json({ success: true })
              }
              return res.json({ success: false })
          }
      } else {
          return res.json({ success: false })
      }

  } catch (error) {
    console.log(error);
    res.json({ error: error})
    
  }

}