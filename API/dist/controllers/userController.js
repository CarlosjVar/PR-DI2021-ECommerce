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
exports.createUser = exports.getAllUsers = void 0;
const Database_1 = __importDefault(require("../config/Database"));
const express_validator_1 = require("express-validator");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield Database_1.default.users.findMany();
        res.status(200).json({ users: allUsers });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            console.log("error body");
            res.status(400).json({ errors: errors.array() });
        }
        const { email, fullname, password } = req.body;
        //TODO: CHECK EMAIL
        //TODO: CHECK USER
        yield Database_1.default.users.create({ data: {
                email: email,
                fullName: fullname,
                password: password,
                createdAt: new Date()
            } });
        res.json({ msg: 'Added correctly' });
        // prismaController.users.create({data:{
        //     email: req.body.,
        // }
        // )
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(err);
    }
});
exports.createUser = createUser;
