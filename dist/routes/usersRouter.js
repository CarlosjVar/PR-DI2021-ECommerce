"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const usersController_1 = require("../controllers/usersController");
const userRouter = express_1.default.Router();
// @route   GET - /api/users/current
// @desc    Returns the current authenticated user
// @access  Admin or Authenticated Client
userRouter.route('/current').get([isAuthenticated_1.default], usersController_1.getCurrentAuth);
exports.default = userRouter;
