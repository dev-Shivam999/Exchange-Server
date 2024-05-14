import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { Response } from "express";
import { SelProduct } from "../../type/type";
import fs from "fs";
import { SelModel, SelUs } from "../../models/SelModels";
import { CustomRequest } from "../../utils/utils";

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'upload'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
export const uploads = multer({ storage: storage });

cloudinary.config({
    cloud_name: `${process.env.CloudName}`,
    api_key: `${process.env.CloudApi}`,
    api_secret: `${process.env.CloudSecret}`
});


export const SelPic = async (req: CustomRequest, res: Response) => {
    
    try {


        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }




        const userId = req.userId;

        const result = await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path);
        const existingPicture: SelProduct | null = await SelModel.findOne({ userId });

        if (!existingPicture) {

            return res.status(500).json({ success: false, message: 'File upload failed' });
        }


        if (String(existingPicture.userId) == userId) {
            const productId = await req.body.id

            await SelModel.findByIdAndUpdate({ _id: req.body.id }, { $set: { ProductImg: result.secure_url } })
            const updatedProductImg = result.secure_url; // Example updated image URL

            const ex = await SelUs.findById(userId);


            const o = ex?.Product.find((f) => f._id == productId)


            if (!o) {
                return res.status(500).json({ success: false, message: 'File upload failed' });
            }

            o.ProductImg = updatedProductImg


            const p = await SelUs.findByIdAndUpdate(userId, { $set: { Product: ex?.Product } })





            return res.status(200).json({ message: result.secure_url, success: true });

        } else {
            return res.status(500).json({ success: false, message: 'File upload failed' });
        }
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return res.status(500).json({ success: false, message: 'File upload failed' });
    }
};


