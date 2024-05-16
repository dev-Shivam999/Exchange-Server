"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Number = void 0;
const SelModels_1 = require("../../models/SelModels");
const Number = async (req, res) => {
    const { userId } = req.body;
    const data = await SelModels_1.SelUs.findById(userId);
    if (data) {
        const some = data.number;
        res.json({ success: true, message: some });
    }
    else {
        res.json({ success: false, message: "Product Seller not found plz try again" });
    }
};
exports.Number = Number;
