"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelPic = exports.uploads = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const SelModels_1 = require("../../models/SelModels");
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, 'upload'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
exports.uploads = (0, multer_1.default)({ storage: storage });
cloudinary_1.v2.config({
    cloud_name: `${process.env.CloudName}`,
    api_key: `${process.env.CloudApi}`,
    api_secret: `${process.env.CloudSecret}`
});
const SelPic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        const userId = req.userId;
        const result = await cloudinary_1.v2.uploader.upload(req.file.path);
        fs_1.default.unlinkSync(req.file.path);
        const existingPicture = await SelModels_1.SelModel.findOne({ userId });
        if (!existingPicture) {
            return res.status(500).json({ success: false, message: 'File upload failed' });
        }
        if (String(existingPicture.userId) == userId) {
            const productId = await req.body.id;
            await SelModels_1.SelModel.findByIdAndUpdate({ _id: req.body.id }, { $set: { ProductImg: result.secure_url } });
            const updatedProductImg = result.secure_url; // Example updated image URL
            const ex = await SelModels_1.SelUs.findById(userId);
            const o = ex?.Product.find((f) => f._id == productId);
            if (!o) {
                return res.status(500).json({ success: false, message: 'File upload failed' });
            }
            o.ProductImg = updatedProductImg;
            const p = await SelModels_1.SelUs.findByIdAndUpdate(userId, { $set: { Product: ex?.Product } });
            return res.status(200).json({ message: result.secure_url, success: true });
        }
        else {
            return res.status(500).json({ success: false, message: 'File upload failed' });
        }
    }
    catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return res.status(500).json({ success: false, message: 'File upload failed' });
    }
};
exports.SelPic = SelPic;
