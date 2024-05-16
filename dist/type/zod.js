"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSchema = exports.LoginSchema = exports.userSchemaZod = void 0;
const zod_1 = require("zod");
exports.userSchemaZod = zod_1.z.object({
    name: zod_1.z.string().min(3, "name is required"),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5, "password is required 5 letter "),
    number: zod_1.z.string().length(10, "number is required must be 10 ")
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5, "password is required 5 letter ")
});
exports.AddSchema = zod_1.z.object({
    ProductName: zod_1.z.string().trim().min(3, "product name is required"),
    ProductTittle: zod_1.z.string().trim().min(5, "product name is required"),
    ProductPrice: zod_1.z.string().trim().min(1, "price is required"),
    ProductType: zod_1.z.string(),
    ProductDiscretion: zod_1.z.string().trim().min(20, "discretion is required 20 word"),
    District: zod_1.z.string().trim().min(3, "District is required "),
    State: zod_1.z.string().trim().min(3, "state is required")
});
