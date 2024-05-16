"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
const UserModels_1 = require("../../models/UserModels");
const profile = async (req, res) => {
    try {
        const userId = req.userId;
        const existingUser = await UserModels_1.UserSchema.findById(userId);
        const Pic = await UserModels_1.Picture.findOne({ UserId: existingUser?._id });
        if (existingUser) {
            const url = Pic?.pic;
            // Additional values to send
            const additionalValues = {
                _id: existingUser._id,
                name: existingUser.name,
                number: existingUser.number,
                email: existingUser.email
            };
            // Merge additional values with URL and existing user data
            const responseData = {
                // Convert existingUser to plain object
                url,
                ...additionalValues,
            };
            return res.json({ success: true, message: responseData });
        }
        else {
            return res.json({ success: false, message: "login sl first" });
        }
    }
    catch (error) {
        console.log("error", error);
        res.json({ success: false, message: "Login failed" });
    }
};
exports.profile = profile;
