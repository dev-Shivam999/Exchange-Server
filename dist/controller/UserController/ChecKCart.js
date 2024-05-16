"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckCart = void 0;
const UserModels_1 = require("../../models/UserModels");
const CheckCart = async (req, res) => {
    const { id } = req.body;
    const userId = req.userId;
    const data = await UserModels_1.UserCart.findOne({ userId: userId });
    if (data) {
        const val = data.product.filter(p => p._id == id);
        if (val.length > 0) {
            res.json({ success: true });
        }
        else {
            res.json({ success: false });
        }
    }
    else {
        res.json({ success: false });
    }
};
exports.CheckCart = CheckCart;
