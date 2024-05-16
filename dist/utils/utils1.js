"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.val2 = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const UserModels_1 = require("../models/UserModels");
(0, dotenv_1.config)();
const val2 = async (req, res, next) => {
    const token = await req.cookies.token;
    if (token == undefined) {
        return res.json({ success: false, message: "Login first" });
    }
    else {
        let decodedToken;
        try {
            decodedToken = jsonwebtoken_1.default.verify(token, `${process.env.SECRET}`);
        }
        catch (error) {
            console.error("Error verifying token:", error);
            return res.status(400).json({ success: false, message: 'Invalid token' });
        }
        // Check if the decoded token contains user ID
        if (typeof decodedToken === 'string' || !decodedToken.userId) {
            console.error("Invalid token payload:", decodedToken);
            return res.status(400).json({ success: false, message: 'Invalid token payload' });
        }
        let userId = String(decodedToken.userId);
        const existingUser = await UserModels_1.UserSchema.findById(userId);
        if (existingUser == null) {
            return res.json({ success: false, message: "Login first " });
        }
        else {
            req.userId = userId;
            next();
        }
    }
};
exports.val2 = val2;
