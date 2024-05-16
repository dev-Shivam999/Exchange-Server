"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelUs = exports.SelModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ClientSel = new mongoose_1.default.Schema({
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
        type: [],
        default: []
    }
});
const SelUser = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "ClientSel",
        required: true,
    },
    ProductName: {
        type: String,
        required: true,
    },
    ProductTittle: {
        type: String,
        required: true,
    },
    ProductPrice: {
        type: String,
        required: true,
    },
    ProductType: {
        type: String,
        required: true,
    },
    ProductDiscretion: {
        type: String,
        required: true,
    },
    ProductImg: {
        type: String,
        default: ""
    },
    District: {
        type: String,
        required: true,
    }, State: {
        type: String,
        required: true,
    }
});
exports.SelModel = mongoose_1.default.model('SelModel', SelUser);
exports.SelUs = mongoose_1.default.model('SelUs', ClientSel);
