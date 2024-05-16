"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edit = void 0;
const UserModels_1 = require("../../models/UserModels");
const Edit = async (req, res) => {
    try {
        const { p } = req.body;
        const userId = req.userId;
        const data = await UserModels_1.UserSchema.findByIdAndUpdate(userId, { $set: { name: p.name, email: p.email, number: p.number } });
        return res.json({ success: true });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false });
    }
};
exports.Edit = Edit;
