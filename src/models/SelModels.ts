import mongoose, { Model } from "mongoose";
import { SelProduct, s } from "../type/type";
import { boolean } from "zod";



const ClientSel = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  Product:{
    type: [],
    default: []
  }
 

})

const SelUser=new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"ClientSel",
    required: true,
  },

  ProductName:{
    type:String,
    required:true,
  },
  ProductTittle:{
    type:String,
    required:true,
  },
  ProductPrice:{
    type:String,
    required:true,
  },
  ProductType:{
    type:String,
    required:true,
  },
  ProductDiscretion:{
type:String,
required:true,
  },
  ProductImg:{
    type: String,
    default:""
  }
    
})


export const SelModel: Model<SelProduct> = mongoose.model<SelProduct>('SelModel',SelUser);
export const SelUs: Model<s> = mongoose.model<s>('SelUs', ClientSel);