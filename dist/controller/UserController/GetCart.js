"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCart = void 0;
const UserModels_1 = require("../../models/UserModels");
const GetCart = async (req, res) => {
    const userId = req.userId;
    const p = await UserModels_1.UserSchema.findById(userId);
    if (p) {
        const data = await UserModels_1.UserCart.findOne({ userId: userId });
        res.json({ success: true, message: data?.product });
    }
    else {
        res.json({ success: false, message: "login first" });
    }
};
exports.GetCart = GetCart;
