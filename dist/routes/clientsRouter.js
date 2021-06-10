"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const clientController_1 = require("../controllers/clientController");
const clientsRouter = express_1.default.Router();
// @route   POST - /api/clients/create
// @desc    Creates a client in the system
// @access  Public
clientsRouter
    .route("/create")
    .post([
    express_validator_1.body("email").isEmail().withMessage("Por favor ingrese un email"),
    express_validator_1.body("fullname")
        .isLength({ min: 8 })
        .withMessage("Por favor ingrese un nombre de al menos 8 caracteres"),
    express_validator_1.body("password")
        .isStrongPassword()
        .withMessage("Por favor ingrese una contraseña más segura"),
], clientController_1.createClient);
exports.default = clientsRouter;
