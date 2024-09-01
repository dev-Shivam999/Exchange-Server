import { Response } from "express";
import { CustomRequest } from "../../utils/utils";
import { UserSchema } from "../../models/UserModels";
import { SelModel } from "../../models/SelModels";

export const SelPic = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { arr } = req.body;
        const id = arr.pop();
        

        await SelModel.findByIdAndUpdate({ _id: id }, { ProductImg: arr });

        const existingPicture = await UserSchema.findById(userId);
        if (!existingPicture) {
            return res.status(500).json({ success: false, message: 'Login plz failed' });
        }

        if (String(existingPicture._id) === userId) {
            const product = existingPicture.Product.find((p) => p._id == id);
            
            if (product) {
                product.ProductImg = arr;
                
                await UserSchema.findByIdAndUpdate({ _id: userId }, { Product: existingPicture.Product });
                return res.status(200).json({ message: "", success: true });
            } else {
                return res.json({ success: true, message: 'try again or product not found' });
            }
        } else {
            return res.status(500).json({ success: false, message: 'File upload failed' });
        }
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return res.status(500).json({ success: false, message: 'File upload failed' });
    }
};