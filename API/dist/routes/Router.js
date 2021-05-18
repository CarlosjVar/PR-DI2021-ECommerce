"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsRouter_1 = __importDefault(require("./productsRouter"));
const ordersRouter_1 = __importDefault(require("./ordersRouter"));
const usersRouter_1 = __importDefault(require("./usersRouter"));
const router = express_1.default();
router.use('/products', productsRouter_1.default);
router.use('/users', usersRouter_1.default);
router.use('/orders', ordersRouter_1.default);
exports.default = router;
