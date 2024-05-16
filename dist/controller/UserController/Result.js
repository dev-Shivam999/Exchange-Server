"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const SelModels_1 = require("../../models/SelModels");
const Result = async (req, res) => {
    const queryParams = req.query;
    const searchQuery = queryParams.q;
    const results = await SelModels_1.SelModel.find({ ProductDiscretion: { $regex: String(searchQuery), $options: 'i' } }); // Case-insensitive search
    res.json({ message: results });
};
exports.Result = Result;
