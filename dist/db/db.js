"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Db = async () => {
    try {
        await mongoose_1.default.connect(`${process.env.Db}`);
        console.log("db connection established");
    }
    catch (error) {
        console.log("db error: " + error);
    }
};
exports.Db = Db;
