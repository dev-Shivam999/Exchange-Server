import { Response } from "express";
import { SelModel, SelUs } from "../../models/SelModels";
import { SelModel as s } from "../../type/type";
import { CustomRequest } from "../../utils/utils";
import { AddSchema } from "../../type/zod";
import { UserSchema } from "../../models/UserModels";

export const Pro = async (req: CustomRequest, res: Response) => {

    

    const de: s = req.body
    const validationResult = AddSchema.safeParse(req.body);

    if (!validationResult.success) {
        console.log(validationResult.error.issues[0].message);
        
        return res.json({ success: false, message: validationResult.error.issues[0].message });
    }
   
    
    try {


        const userId = req.userId






        const val = await UserSchema.findByIdAndUpdate({ _id: userId }, { $set: { Marched :true}})



        if (val) {

            const Product = await SelModel.create({
                userId: userId,
                username:val.name,
                ProductPrice: de.ProductPrice,
                ProductType: de.ProductType,
                ProductDiscretion: de.ProductDiscretion,
                District: de.ProductCity,
                SubLocation:de.SubLoc,
                ProductName:de.ProductName,
                ProductSale: de.ProductSale
            })




            await UserSchema.findByIdAndUpdate({ _id: userId }, { $push: { Product: Product } })

            return res.json({ success: true, message: 'Product updated successfully', id: Product._id })

        } else {

            return res.json({ success: false, message: 'LOGIN first' })

        }

    }


    catch (error) {
        console.log(error);
        return res.json({ success: false, message: "something went wrong" })

    }
}