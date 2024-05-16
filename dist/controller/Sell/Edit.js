"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edit = void 0;
const SelModels_1 = require("../../models/SelModels");
const Edit = async (req, res) => {
    try {
        const lol = req.body;
        const data = lol.p;
        const user = await SelModels_1.SelUs.findById(data.userId);
        if (!user)
            return res.json({ success: false });
        if (user._id == req.userId) {
            const p = await SelModels_1.SelModel.findByIdAndUpdate(data._id, {
                $set: {
                    _id: data._id,
                    userId: data.userId, ProductName: data.ProductName,
                    ProductTittle: data.ProductTittle,
                    ProductPrice: data.ProductPrice,
                    ProductType: data.ProductType,
                    ProductDiscretion: data.ProductDiscretion,
                    ProductImg: data.ProductImg,
                }
            });
            const ll = user.Product.map(p => p._id == data._id ? { ...p,
                userId: data.userId,
                ProductName: data.ProductName,
                ProductTittle: data.ProductTittle,
                ProductPrice: data.ProductPrice,
                ProductType: data.ProductType,
                ProductDiscretion: data.ProductDiscretion,
                ProductImg: data.ProductImg,
                _id: data._id
            } : p);
            await SelModels_1.SelUs.findByIdAndUpdate(data.userId, { $set: { Product: ll } });
        }
        else {
            console.log("lol");
            return res.json({ success: false });
        }
        res.json({ success: true });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false });
    }
};
exports.Edit = Edit;
