"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pic = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const UserModels_1 = require("../../models/UserModels");
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
cloudinary_1.v2.config({
    cloud_name: `${process.env.CloudName}`,
    api_key: `${process.env.CloudKey}`,
    api_secret: `${process.env.CloudSecret}`
});
const pic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        const userId = req.userId;
        const result = await cloudinary_1.v2.uploader.upload(req.file.path);
        fs_1.default.unlinkSync(req.file.path);
        // Find the Picture document with the user ID
        const existingPicture = await UserModels_1.Picture.findOneAndUpdate({ userId });
        if (existingPicture) {
            // If the picture exists, update it
            await cloudinary_1.v2.uploader.destroy(existingPicture.picId);
            await UserModels_1.Picture.findByIdAndUpdate(existingPicture._id, { $set: { pic: result.secure_url } });
            return res.status(200).json({ message: result.secure_url, success: true });
        }
        else {
            // If the picture does not exist, create a new one
            const newPicture = await UserModels_1.Picture.create({
                UserId: userId,
                pic: result.secure_url,
                picId: result.public_id
            });
            return res.status(200).json({ message: newPicture.pic, success: true });
        }
    }
    catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return res.status(500).json({ success: false, message: 'File upload failed' });
    }
};
exports.pic = pic;
