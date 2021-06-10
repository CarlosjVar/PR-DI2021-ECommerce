"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const isAuthenticatedAdmin_1 = __importDefault(require("../middleware/isAuthenticatedAdmin"));
const adminController_1 = require("../controllers/adminController");
const adminRouter = express_1.default.Router();
// @route   POST - /api/admins/create
// @desc    Creates a user in the system
// @access  Only Admin
adminRouter
    .route("/create")
    .post([
    express_validator_1.body("email").isEmail().withMessage("Por favr ingrese un email válido"),
    express_validator_1.body("fullname")
        .isLength({ min: 8 })
        .withMessage("Por favor ingrese un nombre de al menos 8 caracteres"),
    express_validator_1.body("password")
        .isStrongPassword()
        .withMessage("Por favor ingrese una contraseña más segura"),
    isAuthenticatedAdmin_1.default,
], adminController_1.createAdmin);
// @route   GET - /api/admins/get
// @desc    Creates a user in the system
// @access  Only Admin
adminRouter.route("/get").get([isAuthenticatedAdmin_1.default], adminController_1.getAdmins);
exports.default = adminRouter;
