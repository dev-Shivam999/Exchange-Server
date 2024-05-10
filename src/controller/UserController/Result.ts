import { Request, Response } from "express";
import { SelModel } from "../../models/SelModels";
import { QueryParams } from "./Search";

export const Result = async (req: Request, res: Response) => {
    const queryParams = req.query as unknown as QueryParams;

    const searchQuery: string = queryParams.q;

    const results = await SelModel.find({ ProductDiscretion: { $regex: String(searchQuery), $options: 'i' } }); // Case-insensitive search

    res.json({ message: results })




};