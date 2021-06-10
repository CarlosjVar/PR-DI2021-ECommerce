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
exports.getAdmins = exports.createAdmin = void 0;
const Database_1 = __importDefault(require("../config/Database"));
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Obtain from the body
        const { email, fullname, password } = req.body;
        //Check if the email already exists in the database
        const userWithEmail = yield Database_1.default.users.findUnique({
            where: {
                email: email,
            },
        });
        if (userWithEmail) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Ese email ya se encuentra registrado" }] });
        }
        //Password Encryption
        let encryptedPassword = yield bcrypt_1.default.hash(password, 10);
        //Creates a User in the database to associate with a Client register
        const user = yield Database_1.default.users.create({
            data: {
                email: email,
                fullName: fullname,
                password: encryptedPassword,
                createdAt: new Date(),
            },
        });
        //Creates a Client in the database based on the id of the user registered before
        const admin = yield Database_1.default.admins.create({
            data: {
                userId: user.id,
            },
        });
        res.json({
            msg: "Administrador añadido correctamente",
            userInfo: user,
            admInfo: admin,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log(err);
    }
});
exports.createAdmin = createAdmin;
const getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield Database_1.default.users.findMany({
            where: {
                NOT: {
                    Admins: null,
                },
            },
            select: {
                email: true,
                fullName: true,
                createdAt: true,
                Admins: true,
            },
        });
        res.json({ admins: admins });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAdmins = getAdmins;
