import { Request, Response } from "express";
import { SelModel } from "../../models/SelModels";

export interface QueryParams {
    q: string;
}

export const Search = async (req: Request, res: Response) => {
    const queryParams = req.query as unknown as QueryParams;

    const searchQuery: string = queryParams.q;
    const {search}=req.body
    
    const minPrice = search.range - ((search.range) / 2)
    const maxPrice=search.range+((search.range)/2)
    const locationQuery = search.location
    const buyOrRent=search.type


    const results = await SelModel.find({ $and: [
    { ProductDiscretion: { $regex: String(searchQuery), $options: 'i' } },
        { ProductPrice: { $gte: minPrice, $lte: maxPrice } },
        { District: { $regex: String(locationQuery), $options: 'i' } },
        { ProductType:  { $in: [buyOrRent] } }
  ] }); 

    res.json({ message: results })
    

    

};
