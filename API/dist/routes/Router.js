"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsRouter_1 = __importDefault(require("./productsRouter"));
const ordersRouter_1 = __importDefault(require("./ordersRouter"));
const router = express_1.default();
router.use('/products', productsRouter_1.default);
router.use('/users', ordersRouter_1.default);
router.use('/orders', productsRouter_1.default);
exports.default = router;
