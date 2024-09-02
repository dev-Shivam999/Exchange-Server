import mongoose, { Model } from "mongoose";
import { SelProduct, s } from "../type/type";
import { boolean, string } from "zod";



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
  Product: {
    type:[],
    default: [],
  }
 

})

const SelUser=new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"ClientSel",
    required: true,
  },
verify:{
  type:Boolean,
  default: false
},
ProductSale:{
type:String,
required: true,
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
    type: [],
    default:""
  },
  District:{
    type:String,
    required:true,
  },
  SubLocation:{
    type:String,
    required:true,
  }
    
})


export const SelModel: Model<SelProduct> = mongoose.model<SelProduct>('SelModel',SelUser);
export const SelUs: Model<s> = mongoose.model<s>('SelUs', ClientSel);