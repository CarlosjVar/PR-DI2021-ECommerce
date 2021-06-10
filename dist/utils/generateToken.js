"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (data) => {
    return jsonwebtoken_1.default.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' });
};
exports.default = generateToken;
