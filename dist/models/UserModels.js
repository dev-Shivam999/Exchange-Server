"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCart = exports.Picture = exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Client = new mongoose_1.default.Schema({
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
    }
});
const pic = new mongoose_1.default.Schema({
    UserId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
});
const car = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    product: {
        type: [],
        default: {}
    }
});
exports.UserSchema = mongoose_1.default.model('UserSchema', Client);
exports.Picture = mongoose_1.default.model('Picture', pic);
exports.UserCart = mongoose_1.default.model('Cart', car);
