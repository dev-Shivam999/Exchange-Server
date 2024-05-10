import express, { Request, Response } from 'express';
import { Sign } from '../controller/UserController/Sign';
import { pic, upload } from '../controller/UserController/pic';
import { Login } from '../controller/UserController/Lgin';
import { profile } from '../controller/UserController/profile';
import { val } from '../utils/utils';
import { Product } from '../controller/UserController/ProductU';
import { ProductInfo } from '../controller/UserController/ProductInfo';
import { Cart } from '../controller/UserController/Cart';
import { CheckCart } from '../controller/UserController/ChecKCart';
import { GetCart } from '../controller/UserController/GetCart';
import { Number } from '../controller/UserController/Number';
import { Search } from '../controller/UserController/Search';
import { Result } from '../controller/UserController/Result';
import { val2 } from '../utils/utils1';


export const UserRouter = express.Router();


UserRouter.get('/data', (req: Request, res: Response) => {
    res.send("lol")


})


UserRouter.post('/Sign', Sign);
UserRouter.post('/Login', Login);
UserRouter.post('/pic',val2, upload.single('file') ,pic)
UserRouter.get('/profile',val2,profile)
UserRouter.get('/pro',Product)
UserRouter.post('/Cart',val2,Cart)
UserRouter.post('/Product',ProductInfo)
UserRouter.post('/CheckCart',val2,CheckCart)
UserRouter.post('/Number',val2,Number)
UserRouter.get('/GetCart',val2,GetCart)
UserRouter.put('/Search',Search)
UserRouter.put('/Result',Result)




