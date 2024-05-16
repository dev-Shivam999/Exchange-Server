"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const SelModels_1 = require("../../models/SelModels");
const Search = async (req, res) => {
    const queryParams = req.query;
    const searchQuery = queryParams.q;
    const results = await SelModels_1.SelModel.find({ ProductDiscretion: { $regex: String(searchQuery), $options: 'i' } }); // Case-insensitive search
    res.json({ message: results.map(result => { return { name: result.ProductTittle, id: result._id }; }) });
};
exports.Search = Search;
