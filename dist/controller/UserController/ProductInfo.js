"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInfo = void 0;
const SelModels_1 = require("../../models/SelModels");
const ProductInfo = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await SelModels_1.SelModel.findById(id);
        if (data) {
            return res.json({ success: true, message: data });
        }
        return res.json({ success: false, message: "try again" });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: "try again" });
    }
};
exports.ProductInfo = ProductInfo;
