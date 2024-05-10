import { Request, Response } from "express";
import { SelModel } from "../../models/SelModels";

export interface QueryParams {
    q: string;
}

export const Search = async (req: Request, res: Response) => {
    const queryParams = req.query as unknown as QueryParams;

    const searchQuery: string = queryParams.q;

    const results = await SelModel.find({ ProductDiscretion: { $regex: String(searchQuery), $options: 'i' } }); // Case-insensitive search

    res.json({ message: results.map(result => {return {name:result.ProductName,id:result._id}}) })
    

    

};
