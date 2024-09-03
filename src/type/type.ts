
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

export interface User{
    _id: string
    Private: boolean
    Marched: boolean;
    pic: string,
    name:string,
    email:string,
    number:string,
    password:string,
    Product: SelProduct[]
}
export interface UserSel{
    name:string,
    email:string,
    number:string,
    password:string,
    opt:string,
    valid:boolean
    Product: SelProduct[]
}

export interface UserCart{
    userId: mongoose.Schema.Types.ObjectId,
    product: SelProduct[]
}



export interface P {
    pic: string;
    picId: string;
}
export type su = mongoose.Document & P
export type s = mongoose.Document & UserSel
export type  Uc= mongoose.Document & UserCart


export interface p extends JwtPayload{
     userId: string, iat: number 
}


export type SelProduct=SelModel&mongoose.Document

export interface SelModel{
    verify: boolean,
    ProductPrice:string,
    ProductType:string,
    ProductDiscretion:string,
    ProductImg:string[],
    userId: mongoose.Schema.Types.ObjectId,
    ProductSale:string
    ProductCity:string
    SubLoc:string
    ProductName:string
}


