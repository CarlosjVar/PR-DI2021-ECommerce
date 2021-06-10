"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticatedAdmin_1 = __importDefault(require("../middleware/isAuthenticatedAdmin"));
const utilsController_1 = require("../controllers/utilsController");
const multer_1 = require("../middleware/multer");
const utilsRouter = express_1.default.Router();
// @route   GET - /api/utils/specs
// @desc    Returns all the specifications saved in the database
// @access  Public
utilsRouter.route("/specs").get(utilsController_1.findSpecs);
// @route   GET - /api/utils/categories
// @desc    Returns all the categories saved in the database
// @access  Public
utilsRouter.route("/categories").get(utilsController_1.findCategories);
// @route   POST - /api/utils/image/upload
// @desc    Returns all the categories saved in the database
// @access  Public
utilsRouter
    .route("/image/upload")
    .post([multer_1.upload.single("imageFile"), isAuthenticatedAdmin_1.default], utilsController_1.uploadImage);
exports.default = utilsRouter;
utilsRouter.route("/image/:image").get(utilsController_1.getImage);
