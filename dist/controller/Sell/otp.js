"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.opt = void 0;
const SelModels_1 = require("../../models/SelModels");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const opt = async (req, res) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const name = req.cookies.name;
    const email = req.cookies.email;
    const password = req.cookies.password;
    const number = req.cookies.number;
    const verifyOtp = req.body.otp;
    if (verifyOtp == exports.opt) {
        const hash = bcrypt_1.default.hashSync(password, 10);
        const newUser = await SelModels_1.SelUs.create({
            name: name,
            password: hash,
            email: email,
            number: number,
            otp: otp
        });
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, "lol");
        res.cookie("token", token);
    }
};
exports.opt = opt;
