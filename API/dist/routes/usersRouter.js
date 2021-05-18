"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const userController_1 = require("../controllers/userController");
const usersRouter = express_1.default.Router();
usersRouter.route('/').get(userController_1.getAllUsers);
usersRouter.route('/create').post([
    express_validator_1.body('email').isEmail().withMessage('Please enter a valid email'),
    express_validator_1.body('fullname')
        .isLength({ min: 10 })
        .withMessage('Please enter a full name with a lenght at least 8 characters long'),
    express_validator_1.body('password')
        .isStrongPassword()
        .withMessage('Please enter a stronger password')
], userController_1.createUser);
exports.default = usersRouter;
