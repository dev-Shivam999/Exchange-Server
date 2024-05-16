"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const zod_1 = require("../../type/zod");
const UserModels_1 = require("../../models/UserModels");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Login = async (req, res) => {
    try {
        const { password, email } = req.body;
        const validationResult = zod_1.LoginSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.json({ success: false, message: validationResult.error.issues[0].message });
        }
        const existingUser = await UserModels_1.UserSchema.findOne({ email: email });
        if (!existingUser) {
            return res.json({ success: false, message: "User not  exists" });
        }
        // Hash the password
        try {
            const hash2 = bcrypt_1.default.hashSync(password, 10);
            const hash = bcrypt_1.default.compareSync(password, existingUser.password);
            if (hash) {
                const token = jsonwebtoken_1.default.sign({ userId: existingUser._id }, `${process.env.SECRET}`);
                return res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: true,
                    expires: new Date(Date.now() + 60000 * 60000)
                })
                    .json({ success: true, message: "user Login in  " });
            }
            else {
                return res.json({ success: false, message: " password  wrong" });
            }
        }
        catch (error) {
            console.log(error);
            return res.json({ success: false, message: error });
        }
    }
    catch (error) {
        console.error("Error during user sign-up:", error);
        return res.status(500).json({ error: true, message: "An error occurred during sign-up" });
    }
};
exports.Login = Login;
