"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const UserModels_1 = require("../../models/UserModels");
const SelModels_1 = require("../../models/SelModels");
const Cart = async (req, res) => {
    const { id } = req.body;
    try {
        const userId = req.userId;
        const Pro = await SelModels_1.SelModel.findById(id);
        if (!Pro) {
            return res.json({ success: false, message: '"error"' });
        }
        const p = await UserModels_1.UserSchema.findById(userId);
        if (p) {
            const val = await UserModels_1.UserCart.findOne({ userId: userId });
            if (val) {
                const al = val.product.find(p => p._id == id);
                if (al) {
                    const pro2 = val.product.filter(p => p._id != id);
                    await UserModels_1.UserCart.findOneAndUpdate({ userId: userId }, { $set: { product: pro2 } });
                    res.json({ success: true, message: "delete" });
                }
                else {
                    await UserModels_1.UserCart.findOneAndUpdate({ userId: userId }, { $push: { product: Pro } });
                    res.json({ success: true, message: "update" });
                }
            }
            else {
                await UserModels_1.UserCart.create({
                    userId: userId,
                    product: Pro
                });
                res.json({ success: true, message: "create" });
            }
        }
        else {
            res.json({ success: false, message: "Login" });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.Cart = Cart;
