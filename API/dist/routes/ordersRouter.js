"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordersRouter = express_1.default.Router();
ordersRouter.route('/').get(() => {
    console.log("Hola orders");
});
exports.default = ordersRouter;
