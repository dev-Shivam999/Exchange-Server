import express, { Request, Response } from 'express';
import { Product } from '../controller/Sell/Product';
import { Pro } from '../controller/Sell/Pro';
import { SelPic } from '../controller/Sell/selpic';
import { val } from '../utils/utils';
import { DeleteProduct } from '../controller/Sell/DeleteProduct';
import { Edit } from '../controller/Sell/Edit';
import { val2 } from '../utils/utils1';


export const SelRoute = express.Router()



SelRoute.get('/Product',val,Product)
SelRoute.post('/Pro',val2,Pro)

SelRoute.post('/DeleteProduct',val,DeleteProduct)
SelRoute.post('/Edit',val,Edit)
SelRoute.post('/verify', val2, (req: Request, res: Response)=> {
    return res.json({ "success": true })
})
SelRoute.post('/SelPic',val2, SelPic)
