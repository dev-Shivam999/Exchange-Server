import { Response } from "express";
import { SelModel, SelUs } from "../../models/SelModels";
import { SelModel as s } from "../../type/type";
import { CustomRequest } from "../../utils/utils";
import { AddSchema } from "../../type/zod";

export const Pro = async (req: CustomRequest, res: Response) => {

    const validationResult = AddSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.json({ success: false, message: validationResult.error.issues[0].message });
    }
    try {


        const userId = req.userId

        const de: s = req.body





        const val = await SelUs.findById(userId)


        if (val) {

            const Product = await SelModel.create({
                userId: userId,
                ProductName: de.ProductName,
                ProductTittle: de.ProductTittle,
                ProductPrice: de.ProductPrice,
                ProductType: de.ProductType,
                ProductDiscretion: de.ProductDiscretion,
                District: de.District,
                State: de.State
            })


            await SelUs.findByIdAndUpdate({ _id: userId }, { $push: { Product: Product } })

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