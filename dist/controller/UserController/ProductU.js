"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const SelModels_1 = require("../../models/SelModels");
const Product = async (req, res) => {
    const D = await SelModels_1.SelModel.find({});
    if (D) {
        return res.json({ success: true, message: D });
    }
    else {
        return res.json({ success: false, message: "Invalid" });
    }
};
exports.Product = Product;
