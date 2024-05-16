"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProduct = void 0;
const SelModels_1 = require("../../models/SelModels");
const DeleteProduct = async (req, res) => {
    try {
        const { e } = req.body;
        const userId = req.userId;
        if (userId) {
            const data = await SelModels_1.SelModel.findById(e);
            const user = await SelModels_1.SelUs.findById(userId);
            if (data && user) {
                if (String(data.userId) == userId) {
                    await SelModels_1.SelModel.findByIdAndDelete(e);
                    const data = user.Product.filter(p => p._id != e);
                    await SelModels_1.SelUs.findByIdAndUpdate(userId, { $set: { Product: data } });
                    return res.json({ success: true });
                }
                return res.json({ success: false });
            }
        }
        else {
            return res.json({ success: false });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ error: error });
    }
};
exports.DeleteProduct = DeleteProduct;
