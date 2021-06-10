"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsController_1 = require("../controllers/productsController");
const isAuthenticatedAdmin_1 = __importDefault(require("../middleware/isAuthenticatedAdmin"));
const express_validator_1 = require("express-validator");
const productsRouter = express_1.default.Router();
// @route   POST - /api/products/create
// @desc    Creates a product in the system
// @access  Only Admin
productsRouter
    .route("/create")
    .post([
    express_validator_1.body("name")
        .notEmpty()
        .withMessage("Por favor ingrese un nombre para el producto"),
    express_validator_1.body("quantity")
        .notEmpty()
        .withMessage("Por favor ingrese la cantidad en stock"),
    express_validator_1.body("category")
        .notEmpty()
        .withMessage("Por favor ingrese una categoría"),
    express_validator_1.body("price")
        .notEmpty()
        .withMessage("Por favor ingrese un precio inicial"),
    express_validator_1.body("specifications")
        .isLength({ min: 1 })
        .withMessage("Por favor ingrese al menos una especificación"),
    isAuthenticatedAdmin_1.default,
], productsController_1.createProduct);
// @route   GET - /api/products/get
// @desc    Gets all the products that matches the given parameters
// @access  Public
productsRouter.route("/getAll").get([], productsController_1.findProducts);
// @route   DELETE - /api/products/delete
// @desc    Deletes a product based on an id sent
// @access  Public
productsRouter.route("/delete").delete([isAuthenticatedAdmin_1.default], productsController_1.deleteProducts);
productsRouter
    .route("/update")
    .put([
    express_validator_1.body("name")
        .notEmpty()
        .withMessage("Por favor ingrese un nombre para el producto"),
    express_validator_1.body("quantity")
        .notEmpty()
        .withMessage("Por favor ingrese la cantidad en stock"),
    express_validator_1.body("category")
        .notEmpty()
        .withMessage("Por favor ingrese una categoría"),
    express_validator_1.body("price")
        .notEmpty()
        .withMessage("Por favor ingrese un precio inicial"),
    express_validator_1.body("specifications")
        .isLength({ min: 1 })
        .withMessage("Por favor ingrese al menos una especificación"),
    isAuthenticatedAdmin_1.default,
], productsController_1.updateProduct);
productsRouter.route("/get/:id").get([], productsController_1.findProduct);
productsRouter
    .route("/getTopProducts")
    .get([isAuthenticatedAdmin_1.default], productsController_1.getTopProducts);
productsRouter
    .route("/pcBuilder/getProducts/:idcategoria/:idSpecification/:value")
    .get(productsController_1.pcBuilderProdSearch);
exports.default = productsRouter;
