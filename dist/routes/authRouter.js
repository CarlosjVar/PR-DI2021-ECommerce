"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authenticationController_1 = require("../controllers/authenticationController");
const authRouter = express_1.default.Router();
// @route   POST - /api/auth/authUser
// @desc    Authenticates an user
// @access  Public
authRouter
    .route("/authUser")
    .post([
    express_validator_1.body("email").isEmail().withMessage("Por favor ingrese un email"),
    express_validator_1.body("password")
        .notEmpty()
        .withMessage("Por favor ingrese una contraseña"),
], authenticationController_1.authUser);
authRouter.route;
exports.default = authRouter;
