import { Response } from "express";
import { CustomRequest } from "../../utils/utils";
import { SelModel, SelUs } from "../../models/SelModels";
import { log } from "console";

export const Edit = async (req: CustomRequest, res: Response) => {


    try {
        const lol = req.body
        const data=lol.p
        

        const user = await SelUs.findById(data.userId)
        

        if (!user) return res.json({ success: false });
        if (user._id == req.userId) {

           const p= await SelModel.findByIdAndUpdate(data._id, {
                $set: {
                    _id: data._id,
                    userId: data.userId, ProductName:
                        data.ProductName,
                    ProductTittle:
                        data.ProductTittle,
                    ProductPrice:
                        data.ProductPrice,
                    ProductType:
                        data.ProductType,
                    ProductDiscretion:
                        data.ProductDiscretion,
                    ProductImg:
                        data.ProductImg,
                }
            })  
            





            const ll = user.Product.map(p => p._id == data._id ? {...p,
                
                userId: data.userId, 
                ProductName:
                    data.ProductName,
                ProductTittle:
                    data.ProductTittle,
                ProductPrice:
                    data.ProductPrice,
                ProductType:
                    data.ProductType,
                ProductDiscretion:
                    data.ProductDiscretion,
                ProductImg:
                    data.ProductImg,
                    _id: data._id
            } : p)
            


            await SelUs.findByIdAndUpdate(data.userId, { $set: { Product: ll } })


        }
        else {
            console.log("lol");

            return res.json({ success: false })
        }






        res.json({ success: true })
    } catch (error) {
        console.log(error);
        res.json({success: false});
        
    }
}