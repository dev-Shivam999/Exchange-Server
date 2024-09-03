import mongoose, { Model } from "mongoose";
import { Uc, User, su } from "../type/type";

export type UserSC = User & mongoose.Document
const Client = new mongoose.Schema({
    pic: {
        type: String,
        required: false,
    },
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
    Marched:{
        type:Boolean,
        default:false
    }, Product: {
        type:[],default:[]
    },

    Private:{
        type:Boolean,
        default:false
    }
})
const pic = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true,
    },

    pic: {
        type: String,
        required: true
    },
    picId: {
        type: String,
        required: true

    },
})
const car = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    product: {
        type: [],
        default: {}
    }
})
export const UserSchema: Model<UserSC> = mongoose.model<UserSC>('UserSchema', Client)

export const Picture: Model<su> = mongoose.model<su>('Picture', pic)
export const UserCart: Model<Uc> = mongoose.model<Uc>('Cart', car)




