"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRouter = express_1.default.Router();
usersRouter.route('/').get((req, res) => {
    console.log("Hola users");
    res.send("Ruta funcional");
});
exports.default = usersRouter;
