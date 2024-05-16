"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pro = void 0;
const SelModels_1 = require("../../models/SelModels");
const zod_1 = require("../../type/zod");
const Pro = async (req, res) => {
    const validationResult = zod_1.AddSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.json({ success: false, message: validationResult.error.issues[0].message });
    }
    try {
        const userId = req.userId;
        const de = req.body;
        const val = await SelModels_1.SelUs.findById(userId);
        if (val) {
            const Product = await SelModels_1.SelModel.create({
                userId: userId,
                ProductName: de.ProductName,
                ProductTittle: de.ProductTittle,
                ProductPrice: de.ProductPrice,
                ProductType: de.ProductType,
                ProductDiscretion: de.ProductDiscretion,
                District: de.District,
                State: de.State
            });
            await SelModels_1.SelUs.findByIdAndUpdate({ _id: userId }, { $push: { Product: Product } });
            return res.json({ success: true, message: 'Product updated successfully', id: Product._id });
        }
        else {
            return res.json({ success: false, message: 'LOGIN first' });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: "something went wrong" });
    }
};
exports.Pro = Pro;
