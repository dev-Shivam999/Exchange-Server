"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db/db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const User_1 = require("./Routers/User");
const cors_1 = __importDefault(require("cors"));
const Sel_1 = require("./Routers/Sel");
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = require("dotenv");
(0, db_1.Db)();
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174"]
}));
app.use((0, express_session_1.default)({
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/user', User_1.UserRouter);
app.use('/Sel', Sel_1.SelRoute);
const Port = process.env.PORT || 4000;
app.listen(Port, () => {
    console.log(`app listening on ${Port}`);
});
