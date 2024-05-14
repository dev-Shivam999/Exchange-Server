import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import {  Response } from "express";
import { Picture } from "../../models/UserModels";
import { su } from "../../type/type";
import fs from "fs";
import { CustomRequest } from "../../utils/utils";

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
export const upload = multer({ storage: storage });

cloudinary.config({
    cloud_name: `${process.env.CloudName}`,
    api_key: `${process.env.CloudKey}`,
    api_secret: `${process.env.CloudSecret}`
});

export const pic = async (req: CustomRequest, res: Response) => {
    try {
        
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

              const userId = req.userId;

        const result = await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path);
        // Find the Picture document with the user ID
      
        
        const existingPicture: su | null = await Picture.findOneAndUpdate( {userId} );

        if (existingPicture) {
            
            // If the picture exists, update it
            await cloudinary.uploader.destroy(existingPicture.picId);
            await Picture.findByIdAndUpdate(existingPicture._id, { $set: { pic: result.secure_url } });
            return res.status(200).json({ message: result.secure_url, success: true });
        } else {
            // If the picture does not exist, create a new one
            const newPicture: su = await Picture.create({
                UserId:userId,
                pic: result.secure_url,
                picId: result.public_id
            });
            return res.status(200).json({ message: newPicture.pic, success: true });
        }
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return res.status(500).json({ success: false, message: 'File upload failed' });
    }
};


