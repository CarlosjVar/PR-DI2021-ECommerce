"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const express_validator_1 = require("express-validator");
const Database_1 = __importDefault(require("../config/Database"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        //Check if the email is registered
        const userWithEmail = yield Database_1.default.users.findUnique({
            where: {
                email: email,
            },
            include: {
                Clients: true,
                Admins: true,
            },
        });
        if (!userWithEmail) {
            return res.status(400).json({
                errors: [{ msg: "El email no se encuentra registrado en el sistema" }],
            });
        }
        const isPassword = yield bcrypt_1.default.compare(password, userWithEmail.password);
        if (!isPassword) {
            return res.status(400).json({ errors: [{ msg: "Contraseña errónea" }] });
        }
        if (!userWithEmail.Clients && !userWithEmail.Admins) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Error en la cuenta, no es administrador ni cliente, por favor contactese con el negocio.",
                    },
                ],
            });
        }
        return res.json({
            token: generateToken_1.default({
                _id: userWithEmail.id,
                email: userWithEmail.email,
                name: userWithEmail.fullName,
                isAdmin: userWithEmail.Clients ? false : true,
            }),
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.authUser = authUser;
