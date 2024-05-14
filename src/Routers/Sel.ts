import express from 'express';
import { SignSel } from '../controller/Sell/SignSel';
import { LoginSel } from '../controller/Sell/Lgin';
import { Product } from '../controller/Sell/Product';
import { Pro } from '../controller/Sell/Pro';
import { SelPic, uploads } from '../controller/Sell/selpic';
import { val } from '../utils/utils';
import { DeleteProduct } from '../controller/Sell/DeleteProduct';
import { Edit } from '../controller/Sell/Edit';


export const SelRoute = express.Router()

SelRoute.post('/Sign',SignSel)
SelRoute.post('/Login',LoginSel)
SelRoute.get('/Product',val,Product)
SelRoute.post('/Pro',val,Pro)
SelRoute.post('/DeleteProduct',val,DeleteProduct)
SelRoute.post('/Edit',val,Edit)
SelRoute.post('/SelPic',val, uploads.single('file'), SelPic)