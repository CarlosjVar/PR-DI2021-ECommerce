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
var jwt = require("jsonwebtoken");
const Database_1 = __importDefault(require("../config/Database"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")) {
        return res.status(401).json({ message: "No autorizado" });
    }
    else {
        try {
            // Get token and decode
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const user = yield Database_1.default.users.findUnique({
                where: {
                    id: decodedToken._id,
                },
                select: {
                    id: true,
                    email: true,
                    fullName: true,
                    createdAt: true,
                    Admins: true,
                    Clients: true,
                },
            });
            req.user = user;
            if (user.Admins != null) {
                req.isAdmin = true;
                delete user.Clients;
            }
            else {
                req.isAdmin = false;
                delete user.Admins;
            }
            next();
        }
        catch (err) {
            res.status(401).json({ message: "No autorizado" });
        }
    }
});
exports.default = isAuthenticated;
