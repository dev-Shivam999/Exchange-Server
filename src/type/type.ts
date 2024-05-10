import { SessionData } from "express-session";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

export interface User{
    name:string,
    email:string,
    number:string,
    password:string,
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
    ProductName:string,
    ProductPrice:string,
    ProductTittle:string,
    ProductType:string,
    ProductDiscretion:string,
    ProductImg:string,
    userId: mongoose.Schema.Types.ObjectId
}


interface MySession extends SessionData {
    username?: string; // Define the properties you'll be using in the session
}