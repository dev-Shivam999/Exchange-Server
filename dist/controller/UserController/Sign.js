"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sign = void 0;
const zod_1 = require("../../type/zod");
const UserModels_1 = require("../../models/UserModels");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Sign = async (req, res) => {
    try {
        const { name, password, email, number } = req.body;
        const validationResult = zod_1.userSchemaZod.safeParse(req.body);
        if (!validationResult.success) {
            return res.json({ error: true, message: validationResult.error.issues[0].message });
        }
        const existingUser = await UserModels_1.UserSchema.findOne({ email: email });
        const existingUser2 = await UserModels_1.UserSchema.findOne({ number: number });
        if (existingUser || existingUser2) {
            return res.json({ error: true, message: "User already exists" });
        }
        // Hash the password
        try {
            const hash = bcrypt_1.default.hashSync(password, 10);
            const newUser = await UserModels_1.UserSchema.create({
                name: name,
                password: hash,
                email: email,
                number: number
            });
            const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, `${process.env.SECRET}`);
            return res.cookie("token", token, {
                httpOnly: true,
                sameSite: true,
                expires: new Date(Date.now() + 60000 * 60000)
            })
                .json({ success: true, message: "user crete " });
        }
        catch (error) {
            console.log(error);
            return res.json({ error: true, message: error });
        }
    }
    catch (error) {
        console.error("Error during user sign-up:", error);
        return res.status(500).json({ error: true, message: "An error occurred during sign-up" });
    }
};
exports.Sign = Sign;
